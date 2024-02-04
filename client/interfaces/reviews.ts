export interface Review {
  _id: string;
  user: string;
  restaurant: string;
  review: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
