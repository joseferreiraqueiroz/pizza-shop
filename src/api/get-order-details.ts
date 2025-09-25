import { api } from "@/lib/axios";

export interface OrderDetailsProps{
    orderId: string
}

export interface GetOrderDetailsResponse{
 id: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    createdAt: Date | null;
    totalInCents: number;
    customer: {
        name: string;
        email: string;
        phone: string | null;
    };
    orderItems: {
        id: string;
        priceInCents: number;
        quantity: number | null;
        product: {
            name: string
        }
    }[];
}

export async function getOrderDetails({orderId}: OrderDetailsProps){
    const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)
    return response.data
}