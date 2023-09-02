import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { reducers } from './store';
import { authEffects } from './store/auth';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { errorHandlerInterceptor } from './interceptors/error-handler.interceptor';

const interceptors = [tokenInterceptor, errorHandlerInterceptor];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors(interceptors)),
    provideAnimations(),
    provideStore(reducers),
    provideStoreDevtools(),
    provideEffects(authEffects),
    provideToastr(),
  ],
};
