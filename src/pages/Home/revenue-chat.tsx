import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import colors from  'tailwindcss/colors'
export function RevenueChart(){
    const chartData = [
        { month: "January", desktop: 186 },
        { month: "February", desktop: 305 },
        { month: "March", desktop: 237 },
        { month: "April", desktop: 73 },
        { month: "May", desktop: 209 },
        { month: "June", desktop: 214 },
      ]
      const chartConfig = {
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
      } satisfies ChartConfig
    return(
    <Card className="bg-transparent col-span-6">
      <CardHeader>
        <CardTitle className="flex flex-col gap-1">
           <span>Receita no período</span>
           <span className="text-sm text-muted-foreground">Receita diária no período</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
      <ChartContainer config={chartConfig} className="h-[300px] w-full px-3">
          <LineChart
            accessibilityLayer
            data={chartData}
            height={30}
          >
            <YAxis stroke="#888" axisLine={false} tickLine={false}/>
            <CartesianGrid vertical={false} />
            <XAxis

              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
              dy={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="linear"
              stroke={colors['violet']['400']}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
    )
}
