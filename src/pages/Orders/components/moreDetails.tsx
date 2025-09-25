import { getOrderDetails, GetOrderDetailsResponse } from "@/api/get-order-details";
import { OrderStatus } from "@/components/order-status";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { MagnifyingGlass } from "phosphor-react";

interface MoreDetailsProps {
  orderId: string;
}

export function MoreDetailsComponent({ orderId }: MoreDetailsProps) {
  const { data: order } = useQuery<GetOrderDetailsResponse>({
    queryKey: ['order', orderId],
    queryFn: () => getOrderDetails({ orderId }),
  });

  if (!order) return null;

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <MagnifyingGlass weight="bold" />
          <span className="sr-only">Mais detalhes</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-1 mb-4">
            <h3 className="text-[18px]">Pedido: {order.id}</h3>
            <span className="text-sm text-muted-foreground">
              Detalhes do pedido
            </span>
          </DialogTitle>

          <DialogDescription>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-600">
                <span className="font-semibold text-foreground dark:text-muted-foreground">
                  Status
                </span>
                <OrderStatus status={order.status} />
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-zinc-600">
                <span className="font-semibold text-foreground dark:text-muted-foreground">
                  Cliente
                </span>
                <span className="text-muted-foreground dark:text-foreground font-semibold">
                  {order.customer.name}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground dark:text-muted-foreground">
                  Realizado em
                </span>
                <span className="text-muted-foreground dark:text-foreground font-semibold">
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleString("pt-BR", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })
                    : "Data não disponível"}
                </span>
              </div>
            </div>

            <div className="mt-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="dark:text-muted-foreground">Produto</TableHead>
                    <TableHead className="dark:text-muted-foreground">Qtd.</TableHead>
                    <TableHead className="dark:text-muted-foreground">Preço</TableHead>
                    <TableHead className="dark:text-muted-foreground">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className="dark:text-foreground font-semibold">
                  {order.orderItems.map(item => (
                    <TableRow key={item.id}>
                      <TableCell>{item.product.name}</TableCell>
                      <TableCell>{item.quantity ?? 1}</TableCell>
                      <TableCell>
                        {(item.priceInCents / 100).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </TableCell>
                      <TableCell>
                        {((item.priceInCents * (item.quantity ?? 1)) / 100).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-2 px-3 py-4 rounded-md text-muted-foreground font-semibold hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700 duration-200 flex items-center justify-between">
                <span>Total do pedido</span>
                <span>
                  {(order.totalInCents / 100).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}