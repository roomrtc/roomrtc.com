import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  MENU_ITEMS = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private menuItems: MenuItems
    ) {
    console.log(menuItems.getAll());
  }

  ngOnInit() {
    this.MENU_ITEMS = this.menuItems.getAll();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
