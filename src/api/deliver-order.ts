import { api } from "@/lib/axios"

export interface DeliverOrder{
    orderId: string
}

export async function  DeliverOrder({orderId}: DeliverOrder){
    const response = await api.patch(`/orders/${orderId}/deliver`)
}