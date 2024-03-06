const CartSummary = ({ cartTotal, DELIVERY_FEE }: { cartTotal: number; DELIVERY_FEE: number }) => {
  return (
    <div className="mb-4 flex w-full flex-col gap-2 border-b pb-2">
      <p className="flex items-center justify-between">
        Delivery fee: <strong>${DELIVERY_FEE.toFixed(2)}</strong>
      </p>
      <p className="flex items-center justify-between">
        Total: <strong>${cartTotal.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default CartSummary;
