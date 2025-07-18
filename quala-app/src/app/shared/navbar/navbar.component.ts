import { Component } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  imports: [
    CommonModule,
    RouterModule,
    NzLayoutModule,
    NzMenuModule
  ]
})
export class NavbarComponent {

  constructor(private router: Router) { }

  menuOption = 'home';

  onOption(option: string): void {
    this.menuOption = option;
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/']);
  }
}