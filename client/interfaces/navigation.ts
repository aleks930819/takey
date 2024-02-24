export interface Navigation {
  _id: string;
  title: string;
  location: 'header' | 'footer';
  items?: Array<{ name: string; link: string }>;
  createdAt?: Date;
  updatedAt?: Date;
}
