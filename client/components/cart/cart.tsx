import Link from 'next/link';
import React from 'react';

const CheckoutMenuItem = () => {
  return (
    <p className="flex w-full items-center justify-between border-b pb-2 text-gray-600">
      Kung Poa Chickhen
      <span>
        <p>1 x $20.00</p>
      </span>
    </p>
  );
};

const Cart = () => {
  return (
    <div className="w-full rounded-lg  px-2 py-6 ">
      <p className="mb-3 text-lg">
        <strong>Your Cart</strong>
      </p>
      <ul className="mb-10 flex flex-col gap-4">
        <CheckoutMenuItem />
        <CheckoutMenuItem />
        <CheckoutMenuItem />
      </ul>
      <div className="mb-4 flex w-full flex-col gap-2">
        <p className="flex items-center justify-between">
          Subtotal (2 items): <strong>$40.00</strong>
        </p>
        <p className="flex items-center justify-between">
          Delivery fee: <strong>$5.00</strong>
        </p>
        <p className="flex items-center justify-between">
          Total: <strong>$45.00</strong>
        </p>
      </div>
      <Link
        href="/checkout"
        className="hover:text-opacty-100 flex items-center justify-center rounded-full bg-primary-dark px-4 py-2 text-white"
      >
        Checkout
      </Link>
    </div>
  );
};

export default Cart;
