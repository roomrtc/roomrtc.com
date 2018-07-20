import { Component, OnInit } from '@angular/core';
import { MenuItems } from '../../shared/menu-items/menu-items';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public menuItems:MenuItems ) { 
    console.log(menuItems.getAll())
  }

  ngOnInit() {
  }
}
