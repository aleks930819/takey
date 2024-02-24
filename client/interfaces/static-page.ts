export interface StaticPage {
  _id: string;
  title: string;
  slug: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}
