export interface Review {
  _id: string;
  user: {
    _id: string;
    photo: string;
    name: string;
  };
  restaurant: string;
  review: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
