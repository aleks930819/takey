import { Order } from '@/interfaces/orders';
import { cn } from '@/lib/utils';
import { formatDate } from '@/utils';
import { Banknote, BarChart, CalendarCheck, DollarSign, Package } from 'lucide-react';

const OrdersList = ({ orders }: { orders: Order[] | undefined }) => {
  return (
    <ul>
      {orders?.map((order) => (
        <li key={order._id} className="flex w-full flex-col gap-2 border-b-2 border-gray-200 p-4 lg:w-1/2">
          <p className="flex items-center gap-1">
            <Package size={16} />
            Order ID: {order._id}
          </p>
          <p className="flex items-center gap-1">
            <CalendarCheck size={16} />
            Created at: {formatDate(order.createdAt as Date)}
          </p>
          <p className="flex items-center gap-1">
            <Banknote size={16} />
            Payment Method: {order.paymentMethod}
          </p>
          <p className="flex items-center gap-1">
            <DollarSign size={16} />
            Total: ${order.total.toFixed(2)}
          </p>
          <p className="flex items-center gap-1">
            <BarChart size={16} />
            Status:
            <span
              className={cn('rounded-md p-1 text-xs uppercase text-white', {
                'bg-green-600': order.status === 'completed',
                'bg-red-600': order.status === 'cancelled',
                'bg-yellow-600': order.status === 'pending',
              })}
            >
              {order.status}
            </span>
          </p>
        </li>
      ))}
    </ul>
  );
};

export default OrdersList;
