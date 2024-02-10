export interface OpeningHours {
  day: string;
  open: string;
  close: string;
}

export interface Restaurant {
  _id: string;
  name: string;
  location: {
    type: string;
    coordinates: number[];
  };
  deliveryTime: string;
  minOrderPrice: number;
  image: string;
  isOpen: boolean;
  avgPrice: number;
  openingHours: OpeningHours[];
  rating: number;
  ratingsQuantity: number;
  ratingsAverage: number;
  city: string;
  cuisine: string;
  createdAt: Date;
  updatedAt: Date;
}
