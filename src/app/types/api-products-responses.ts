import { Product } from './product';

export interface GetProducts {
  total: number;
  limit: number;
  offset: number;
  products: Product[];
}
