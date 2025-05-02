import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils } from "lucide-react";

export function TotalOrdersDay() {
  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
           Pedidos (dia)
           <Utensils/>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-[-20px]">
        <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold">48</span>
            <span className="text-muted-foreground text-sm"><span className="text-red-400">-4%</span> em relação a ontem</span>
        </div>
      </CardContent>
    </Card>
  );
}
