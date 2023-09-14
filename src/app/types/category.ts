import { User } from './user';

export interface Category {
  _id: string;
  name: string;
  user: Pick<User, 'username'> & { _id: string };
}

export type CategoryFormValue = Pick<Category, 'name'>;
