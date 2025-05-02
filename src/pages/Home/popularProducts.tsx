import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import colors from "tailwindcss/colors";
export function PopularProducts() {
  const data = [
    { product: "Pepperoni", amount: 40 },
    { product: "Toscana", amount: 35 },
    { product: "Calabresa", amount: 20 },
    { product: "Mussarela", amount: 60 },
  ];
  const COLORS= [
    colors.sky[500],
    colors.violet[500],
    colors.emerald[500],
    colors.rose[500],
    colors.amber[500]
  ]
  return (
    <Card className="bg-transparent col-span-3">
      <CardHeader>
        <CardTitle className="flex flex-col gap-1">
          <span>Pedidos populares</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="product"
              cx="50%"
              cy="50%"
              outerRadius={86}
              innerRadius={64}
              strokeWidth={8}
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                value,
                index,
              }) => {
                const RADIAN = Math.PI / 180
                const radius = 12 + innerRadius + (outerRadius - innerRadius)
                const x = cx + radius * Math.cos(-midAngle * RADIAN)
                const y = cy + radius * Math.sin(-midAngle * RADIAN)
              
                return (
                  <text
                    x={x}
                    y={y}
                    className="fill-muted-foreground text-xs"
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                  >
                    {data[index].product.length > 12
                      ? data[index].product.substring(0, 12).concat('...')
                      : data[index].product}{' '}
                    ({value})
                  </text>
                )
              }}
            >
            {data.map((_, index) => {
              return( 
              <Cell
               key={`cell-${index}`} 
               fill={COLORS[index]} 
               className="stroke-background"
               />
              )
            })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
