export interface Review {
  _id: string;
  user: {
    photo: string;
    name: string;
  };
  restaurant: string;
  review: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
