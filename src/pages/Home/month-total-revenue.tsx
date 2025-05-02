import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export function MonthTotalRevenue() {
  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
           Receita total (mês)
           <DollarSign/>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-[-20px]">
        <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold">R$ 1248,60</span>
            <span className="text-muted-foreground text-sm"><span className="text-green-400">+2%</span> em relação ao mês passado</span>
        </div>
      </CardContent>
    </Card>
  );
}
