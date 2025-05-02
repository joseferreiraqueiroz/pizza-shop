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
export function OrderPage() {
  return (
    <div className="p-8 flex flex-col gap-4 w-full">
      <div>
        <h1 className="tracking-tight text-2xl font-semibold">Pedidos</h1>
      </div>
      <div className="w-full">
        <form className="flex items-center gap-2">
          <Label>Filtros:</Label>
          <Input placeholder="Id do pedido" className="w-[180px]" />
          <Input placeholder="Nome do cliente" className="w-[320px]" />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Todos status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Em preparo</SelectItem>
              <SelectItem value="dark">Em entrega</SelectItem>
              <SelectItem value="system">Entregue</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="secondary">
            <MagnifyingGlass size={20} weight="bold" />
            Filtrar resultados
          </Button>
          <Button variant="ghost">
            <X size={20} weight="bold" />
            Cancelar filtros
          </Button>
        </form>
        <div className="border rounded-b-md mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]"></TableHead>
                <TableHead className="w-[140px]">Identificador</TableHead>
                <TableHead className="w-[180px]">Realizado há</TableHead>
                <TableHead className="w-[140px]">Status</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead className="w-[140px]">Total do pedido</TableHead>
                <TableHead className="w-[140px]"></TableHead>
                <TableHead className="w-[132px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 10 }).map((_, i) => {
                return (
                  <TableRow key={i}>
                    <TableCell>
                      <MoreDetailsComponent/>
                    </TableCell>
                    <TableCell>458fgdfngfdjsuy895</TableCell>
                    <TableCell>14h</TableCell>
                    <TableCell className="flex items-center gap-2 mt-2">
                      <span className="rounded-full bg-muted-foreground w-2 h-2" />
                      <span>Pendente</span>
                    </TableCell>
                    <TableCell>
                      <span>José ítalo Ferreira</span>
                    </TableCell>
                    <TableCell>R$ 149,00</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                      >
                        Aprovar
                        <CaretRight />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button className="flex items-center gap-2">
                        <CaretRight />
                        cancelar
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
           <Pagination pageIndex={1} itemsCount={105} perPage={10}/>
      </div>
    </div>
  );
}
