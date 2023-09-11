import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideRouterStore } from '@ngrx/router-store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { reducers } from './store';
import { authEffects } from './store/auth';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { errorHandlerInterceptor } from './interceptors/error-handler.interceptor';
import { appEffects } from './store/app';
import { uploadEffect } from './store/upload';
import { usersEffects } from './store/users';

const interceptors = [tokenInterceptor, errorHandlerInterceptor];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors(interceptors)),
    provideAnimations(),
    provideStore(reducers),
    provideRouterStore({ stateKey: 'router' }),
    provideStoreDevtools(),
    provideEffects(appEffects, authEffects, uploadEffect, usersEffects),
    provideToastr(),
  ],
};
