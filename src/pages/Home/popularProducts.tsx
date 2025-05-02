import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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
  
  const chartConfig = {
    Pepperoni: {
      label: "Pepperoni",
    },
    Toscana: {
      label: "Toscana",
    },
    Calabresa: {
      label: "Calabresa",
    },
    Mussarela: {
      label: "Mussarela",
    },
  } satisfies ChartConfig
  return (
    <Card className="bg-transparent col-span-3">
      <CardHeader>
        <CardTitle className="flex flex-col gap-1">
          <span>Pedidos populares</span>
        </CardTitle>
      </CardHeader>
      <CardContent >
      <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] px-0 w-[500px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="product" hideLabel />}
            />
            <Pie
              data={data}
              dataKey="amount"
              labelLine={false}
              outerRadius={86}
              innerRadius={64}
              strokeWidth={8}
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
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
