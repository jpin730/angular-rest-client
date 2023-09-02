import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';

export const REFRESH_TOKEN = new HttpContextToken(() => false);

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const isRefresh = req.context.get(REFRESH_TOKEN);

  const token = localStorage.getItem(isRefresh ? 'refresh' : 'token') || '';

  const modifiedReq = req.clone({
    headers: req.headers.set('x-token', token),
  });
  return next(token ? modifiedReq : req);
};
