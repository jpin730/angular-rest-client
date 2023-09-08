import { ROLE } from '../utils/constants';

export interface User {
  username: string;
  email: string;
  role: ROLE;
  google: boolean;
  avatar: string;
  uid: string;
}
