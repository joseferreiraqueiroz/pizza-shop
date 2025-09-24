type orderStatus =
    | 'pending'
    | 'canceled'
    | 'processing'
    | 'delivering'
    | 'delivered'

interface OrderStatusProps {
    status: orderStatus
}

const orderStatusMap: Record<orderStatus, string> = {
    pending: 'Pendente',
    canceled: 'Cancelado',
    delivered: 'Entregue',
    delivering: 'Em entrega',
    processing: 'Em preparo'
}

export function OrderStatus({status}: OrderStatusProps) {
    return (
        <div className="flex items-center gap-2">
            {status === 'pending' && <span className="rounded-full bg-zinc-400 h-2 w-2" />}
            {status === 'canceled' && <span className="rounded-full bg-rose-500 h-2 w-2" />}
            {status === 'delivered' && <span className="rounded-full bg-emerald-500 h-2 w-2" />}
            {['processing', 'delivering'].includes(status) && <span className="rounded-full bg-amber-400 h-2 w-2" />}

            <span className="text-muted-foreground">{orderStatusMap[status]}</span>
        </div>
    )
}
