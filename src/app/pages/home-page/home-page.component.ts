import { NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { PATH, SIDE_NAVE_LIST } from 'src/app/utils/constants';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgForOf, RouterLink, MatRippleModule, MatIconModule, NgIf],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  sidenavList = SIDE_NAVE_LIST.filter(({ link }) => link !== PATH.home);
}
