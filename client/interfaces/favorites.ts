export interface FavoritesRestaurant {
  _id: string;
  name: string;
  image: string;
}

export interface Favorites {
  _id: string;
  user: string;
  restaurants: FavoritesRestaurant[];
  createdAt: string;
  updatedAt: string;
}
