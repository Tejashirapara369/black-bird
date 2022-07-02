import { Category } from './category';

export class Product {
  dateCreated?: Date;
  id?: string;
  image?: string;
  brand?: string;
  price?: number;
  rating?: number;
  numReviews?: number;
  isFeatured?: boolean;
  name?: string;
  description?: string;
  category?: Category;
  reviews?: any[];
  countInStock?: number;
  images?: string[];
  richDescription?: string;
}
