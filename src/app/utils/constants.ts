import { ApiParsedErrorMessage } from 'src/app/types/api-parsed-error-message';
import { SidenavListItem } from '../types/side-nav-list-item';

export enum BREAKPOINT {
  'sm' = '640px',
  'md' = '768px',
  'lg' = '1024px',
  'xl' = '1280px',
  '2xl' = '1536px',
}

export const API_PARSED_ERROR_MESSAGES: ApiParsedErrorMessage[] = [
  { hint: 'token', message: 'Login required' },
];

export enum PATH {
  home = '',
  login = 'login',
  categories = 'categories',
  products = 'products',
  profile = 'profile',
  users = 'users',
}

export const SIDE_NAVE_LIST: SidenavListItem[] = [
  { title: 'Dashboard', link: PATH.home, icon: 'dashboard' },
  { title: 'Profile', link: PATH.profile, icon: 'account_circle' },
  { title: 'Users', link: PATH.users, icon: 'group', admin: true },
  { title: 'Categories', link: PATH.categories, icon: 'category' },
  { title: 'Products', link: PATH.products, icon: 'view_list' },
];

export enum ROLE {
  admin = 'ADMIN_ROLE',
  user = 'USER_ROLE',
}

export const ROLE_OPTIONS = Object.entries(ROLE).map(([viewValue, value]) => ({
  viewValue,
  value,
}));

export const API_DEFAULT_LIMIT = 5;
export const API_DEFAULT_OFFSET = 0;

export const PAGINATOR_SIZE_OPTIONS = [5, 10, 20];

export const DEBOUNCE_TIME = 300;

export const PASSWORD_MIN_LENGTH = 6;

export const DECIMAL_REGEXP = /^-?\d+(\.\d+)?$/;
