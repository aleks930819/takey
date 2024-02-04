export interface Restaurant {
  _id: string;
  name: string;
  location?: [number];
  deliveryTime: string;
  minOrderPrice: number;
  image: string;
  rating?: number;
  ratingsQuantity?: number;
  ratingsAverage?: number;
  city: string;
  cuisine: string;
  createdAt?: Date;
  updatedAt?: Date;
}
