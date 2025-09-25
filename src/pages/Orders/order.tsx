import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CaretRight, MagnifyingGlass, X } from "phosphor-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination } from "@/components/pagination";
import { MoreDetailsComponent } from "./components/moreDetails";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrders, GetOrdersResponse } from "@/api/get-orders";
import { useSearchParams } from "react-router-dom";
import z from "zod";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { orderStatus, OrderStatus } from "@/components/order-status";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cancelOrder } from "@/api/cancel-order";
import { ApproveOrder } from "@/api/approve-order";
import { DeliverOrder } from "@/api/deliver-order";
import { DispatchOrder } from "@/api/dispatch-order";

export interface OrderTableRowProps {
  orders: {
    orderId: string;
    createdAt: Date;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  }[];
}

const orderFilterSchema = z.object({
  orderId: z.string().optional(),
  customerName: z.string().optional(),
  status: z.string().optional(),
});

type OrderFilterSchema = z.infer<typeof orderFilterSchema>;

export function OrderPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const orderId = searchParams.get("orderId");
  const customerName = searchParams.get("customerName");
  const status = searchParams.get("status");

  const { register, handleSubmit, control, reset } = useForm<OrderFilterSchema>({
    resolver: zodResolver(orderFilterSchema),
    defaultValues: {
      orderId: orderId ?? "",
      customerName: customerName ?? "",
      status: status ?? "all",
    },
  });

  function handleFilter({ orderId, customerName, status }: OrderFilterSchema) {
    setSearchParams((state) => {
      if (orderId) state.set("orderId", orderId);
      else state.delete("orderId");

      if (customerName) state.set("customerName", customerName);
      else state.delete("customerName");

      if (status) state.set("status", status);
      else state.delete("status");

      state.set("page", "1");
      return state;
    });
  }

  function handleClearFilter() {
    setSearchParams((state) => {
      state.delete("orderId");
      state.delete("customerName");
      state.delete("status");
      state.delete("page", "1");
      return state;
    });

    reset({
      orderId: "",
      customerName: "",
      status: "all",
    });
  }

  const pageIndex = z.coerce
    .number()
    .transform((page) => page - 1)
    .parse(searchParams.get("page") ?? "1");

  const { data: result } = useQuery({
    queryKey: ["orders", pageIndex, orderId, customerName, status],
    queryFn: () =>
      getOrders({
        pageIndex,
        orderId,
        customerName,
        status: status === "all" ? null : status,
      }),
  });

  function handlePaginate(pageIndex: number) {
    setSearchParams((prev) => {
      prev.set("page", (pageIndex + 1).toString());
      return prev;
    });
  }

  // precisa vir antes da função de update
  const queryClient = useQueryClient();

  function updateOrdersStatusOnCache(orderId: string, status: orderStatus) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ["orders"],
    });
    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) return;
      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) =>
          order.orderId === orderId ? { ...order, status } : order
        ),
      });
    });
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: cancelOrder,
      async onSuccess(_, { orderId }) {
        updateOrdersStatusOnCache(orderId, "canceled");
      },
    });

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: ApproveOrder,
      async onSuccess(_, { orderId }) {
        updateOrdersStatusOnCache(orderId, "processing");
      },
    });

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: DeliverOrder,
      async onSuccess(_, { orderId }) {
        updateOrdersStatusOnCache(orderId, "delivered");
      },
    });

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: DispatchOrder,
      async onSuccess(_, { orderId }) {
        updateOrdersStatusOnCache(orderId, "delivering");
      },
    });

  return (
    <div className="p-8 flex flex-col gap-4 w-full">
      <div>
        <h1 className="tracking-tight text-2xl font-semibold">Pedidos</h1>
      </div>

      <div className="w-full">
        <form
          onSubmit={handleSubmit(handleFilter)}
          className="flex items-center gap-2"
        >
          <Label>Filtros:</Label>

          <Input
            placeholder="Id do pedido"
            className="w-[180px]"
            {...register("orderId")}
          />

          <Input
            placeholder="Nome do cliente"
            className="w-[320px]"
            {...register("customerName")}
          />

          <Controller
            name="status"
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => (
              <Select
                defaultValue="all"
                name={name}
                onValueChange={onChange}
                value={value}
                disabled={disabled}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Todos status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos status</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="canceled">Cancelado</SelectItem>
                  <SelectItem value="processing">Em preparo</SelectItem>
                  <SelectItem value="delivering">Em entrega</SelectItem>
                  <SelectItem value="delivered">Entregue</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <Button type="submit" variant="secondary">
            <MagnifyingGlass size={20} weight="bold" />
            Filtrar resultados
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={() => handleClearFilter()}
          >
            <X size={20} weight="bold" />
            Cancelar filtros
          </Button>
        </form>

        <div className="border rounded-b-md mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]" />
                <TableHead className="w-[140px]">Identificador</TableHead>
                <TableHead className="w-[180px]">Realizado há</TableHead>
                <TableHead className="w-[140px]">Status</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="w-[140px]">Total do pedido</TableHead>
                <TableHead className="w-[140px]" />
                <TableHead className="w-[132px]" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {result?.orders?.map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell>
                    <MoreDetailsComponent orderId={order.orderId} />
                  </TableCell>

                  <TableCell>{order.orderId}</TableCell>

                  <TableCell>
                    {formatDistanceToNow(new Date(order.createdAt), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </TableCell>

                  <TableCell>
                    <OrderStatus status={order.status} />
                  </TableCell>

                  <TableCell>{order.customerName}</TableCell>

                  <TableCell>
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(order.total)}
                  </TableCell>

                  <TableCell>
                    {order.status === "pending" && (
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() =>
                          approveOrderFn({ orderId: order.orderId })
                        }
                        disabled={isApprovingOrder}
                      >
                        Aprovar
                        <CaretRight />
                      </Button>
                    )}
                    {order.status === "processing" && (
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() =>
                          dispatchOrderFn({ orderId: order.orderId })
                        }
                        disabled={isDispatchingOrder}
                      >
                        Em entrega
                        <CaretRight />
                      </Button>
                    )}
                    {order.status === "delivering" && (
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() =>
                          deliverOrderFn({ orderId: order.orderId })
                        }
                        disabled={isDeliveringOrder}
                      >
                        Entregue
                        <CaretRight />
                      </Button>
                    )}
                  </TableCell>

                  <TableCell>
                    <Button
                      disabled={
                        !["pending", "processing"].includes(order.status) ||
                        isCancelingOrder
                      }
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => cancelOrderFn({ orderId: order.orderId })}
                    >
                      <CaretRight />
                      Cancelar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {result && (
          <Pagination
            onPageChange={handlePaginate}
            pageIndex={result.meta.pageIndex}
            itemsCount={result.meta.totalCount}
            perPage={result.meta.perPage}
          />
        )}
      </div>
    </div>
  );
}
