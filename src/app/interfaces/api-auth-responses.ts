import { User } from './user';

export interface GetAuthCheck {
  user: User;
  token: string;
  refresh: string;
}

export interface PostAuthLogin {
  user: User;
  token: string;
  refresh: string;
}
