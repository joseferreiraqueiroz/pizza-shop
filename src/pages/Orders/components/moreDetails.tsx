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
import { MagnifyingGlass } from "phosphor-react";


export interface Order {
  orderId: string;
  createdAt: Date;
  status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
  customerName: string;
  total: number;
}

interface MoreDetailsProps {
  order: Order;
}
export function MoreDetailsComponent({ order }: MoreDetailsProps) {
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
            <h3 className="text-[18px]">Pedido: {order.orderId}</h3>
            <span className="text-sm text-muted-foreground">
              Detalhes do pedido
            </span>
          </DialogTitle>
          <DialogDescription>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-600">
                <span className="font-semibold text-foreground dark:text-muted-foreground">Status</span>
                <OrderStatus status={order.status} />
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-zinc-600">
                <span className="font-semibold text-foreground dark:text-muted-foreground">Cliente</span>
                <span className="text-muted-foreground dark:text-foreground font-semibold">
                  {order.customerName}
                </span>
              </div>


              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground dark:text-muted-foreground">Realizdo há</span>
                <span className="text-muted-foreground dark:text-foreground font-semibold">
                  <TableCell>
                    {new Date(order.createdAt).toLocaleString("pt-BR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </TableCell>
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
                  <TableRow>
                    <TableCell>Pizza pepperoni família</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>R$ 68,25</TableCell>
                    <TableCell>$150.00</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Pizza pepperoni família</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>R$ 68,25</TableCell>
                    <TableCell>$150.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="mt-2 px-3 py-4 rounded-md text-muted-foreground font-semibold  hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700  duration-200 flex items-center justify-between">
                <span>Total do pedido</span>
                <span>R$ 180,00</span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
