import { getSession } from '@/actions/auth';
import { getMyOrders } from '@/actions/orders';
import { OrdersList } from '@/components';
import { SpaceContainer } from '@/components/common';

const OrdersPage = async () => {
  const session = await getSession();

  if (!session) return null;

  const myOrders = await getMyOrders(session.accessToken);

  if (myOrders?.length === 0) {
    return (
      <div>
        <h1 className="text-lg tracking-wider font-bold">You have no orders yet</h1>
        <SpaceContainer variant="xsmall" />
      </div>
    );
  }

  return (
    <div>
      <h1 className=" text-lg font-bold tracking-wider">My Orders</h1>
      <SpaceContainer variant="xsmall" />
      <OrdersList orders={myOrders} />
      <SpaceContainer variant="xsmall" />
    </div>
  );
};

export default OrdersPage;
