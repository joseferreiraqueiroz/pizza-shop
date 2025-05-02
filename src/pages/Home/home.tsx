import { CanceledOrdersMonth } from "./CanceledOrdersMonth";
import { MonthOrders } from "./month-orders";
import { MonthTotalRevenue } from "./month-total-revenue";
import { PopularProducts } from "./popularProducts";
import { RevenueChart } from "./revenue-chat";
import { TotalOrdersDay } from "./total-orders-day";

export function Home(){
    return (
        <div className="flex flex-col gap-8 p-8">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-4 space-x-3">
                    <MonthTotalRevenue/>
                    <MonthOrders/>
                    <TotalOrdersDay/>
                    <CanceledOrdersMonth/>
                </div>
                <div className="grid grid-cols-9 space-x-3">
                    <RevenueChart/>
                    <PopularProducts/>
                </div>
            </div>
        </div>
    )
}