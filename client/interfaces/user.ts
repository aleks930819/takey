export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  photo: string;
  address: {
    city: string;
    streetName: string;
    streetNumber: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
  active: boolean;
}
