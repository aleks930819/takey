const NotOpenRestaurantMessage = () => {
  return (
    <div className="">
      <p className="text-lg">You cant add items to the cart because the restaurant is closed</p>
      <p className="text-sm text-gray-500">Please try again when the restaurant is open</p>
    </div>
  );
};

export default NotOpenRestaurantMessage;
