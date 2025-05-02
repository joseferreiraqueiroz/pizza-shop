import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

export function CanceledOrdersMonth() {
  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
           Cancelamentos (mês)
           <DollarSign/>
        </CardTitle>
      </CardHeader>
      <CardContent className="mt-[-20px]">
        <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold">20</span>
            <span className="text-muted-foreground text-sm"><span className="text-green-400">+2%</span> em relação a ontem</span>
        </div>
      </CardContent>
    </Card>
  );
}
