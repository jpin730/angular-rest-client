import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { PATH, sidenavList } from 'src/app/utils/constants';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NgForOf, RouterLink, MatRippleModule, MatIconModule],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {
  sidenavList = sidenavList.filter(({ link }) => link !== PATH.home);
}
