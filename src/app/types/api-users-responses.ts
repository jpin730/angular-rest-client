import { User } from './user';

export interface GetUsers {
  total: number;
  limit: number;
  offset: number;
  users: User[];
}
