import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fromApp } from 'src/app/store/app';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [MatProgressSpinnerModule, NgIf, AsyncPipe],
  templateUrl: './loader.component.html',
})
export class LoaderComponent implements OnInit {
  private store = inject(Store);
  isLoading$?: Observable<boolean>;

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromApp.isLoading);
  }
}
