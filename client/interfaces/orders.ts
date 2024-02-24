export interface Order {
  _id: string;
  user?: string;
  paymentMethod: string;
  paid?: boolean;
  guest?: {
    name: string;
    phone: string;
    streetNumber: string;
    streetName: string;
  };
  restaurant: string;
  menuItems: Array<{ menuItems: string; quantity: number }>;
  total: number;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
