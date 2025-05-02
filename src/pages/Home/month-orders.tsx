import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";

export function MonthOrders() {
  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
           Pedidos (mês)
           <Utensils/>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-[-20px]">
        <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold">248</span>
            <span className="text-muted-foreground text-sm"><span className="text-green-400">+6%</span> em relação ao mês passado</span>
        </div>
      </CardContent>
    </Card>
  );
}
