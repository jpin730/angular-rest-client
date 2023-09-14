import { Category } from './category';
import { User } from './user';

export interface Product {
  _id: string;
  name: string;
  category: Pick<Category, 'name'> & { _id: string };
  user: Pick<User, 'username'> & { _id: string };
  price: number;
  inStock: boolean;
}

export type ProductFormValue = Pick<Product, 'name' | 'price' | 'inStock'> & { category: string };
