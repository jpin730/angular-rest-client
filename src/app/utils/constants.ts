import { ApiParsedErrorMessage } from 'src/app/interfaces/api-parsed-error-message';

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
