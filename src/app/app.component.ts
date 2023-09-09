import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { LoaderComponent } from './components/loader/loader.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  template: '<router-outlet/><app-loader/>',
})
export class AppComponent {}
