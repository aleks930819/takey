export interface MenuItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  createdAt: string;
  category: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  menuItems: MenuItem[];
}
