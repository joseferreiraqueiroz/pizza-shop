import { api } from "@/lib/axios"

export interface ApproveOrders{
    orderId: string
}

export async function ApproveOrder({orderId}: ApproveOrders){
    const response = await api.patch(`/orders/${orderId}/approve`)
}