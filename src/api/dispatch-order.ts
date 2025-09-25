import { api } from "@/lib/axios"

export interface DispatchOrder{
    orderId: string
}

export async function DispatchOrder({orderId}: DispatchOrder){
    const response = await api.patch(`/orders/${orderId}/dispatch`)
}