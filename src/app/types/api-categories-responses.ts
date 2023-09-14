import { Category } from './category';

export interface GetCategories {
  total: number;
  limit: number;
  offset: number;
  categories: Category[];
}
