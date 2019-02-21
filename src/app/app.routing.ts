import {Routes} from '@angular/router';

import {AdminComponent} from './layouts/admin/admin.component';
import { LoginComponent } from './layouts/login/login.component';
import { PageNotFoundComponent } from './layouts/page-not-found/page-not-found.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }, {
        path: 'dashboard',
        loadChildren: './components/report/report.module#ReportModule'
      }, {
        path: 'category',
        loadChildren: './components/category/category.module#CategoryModule'
      }, {
        path: 'present',
        loadChildren: './components/present/present.module#PresentModule'
      }
    ]
  }, {
    path: 'login',
    component: LoginComponent
  },  {
    path: '**',
    component: PageNotFoundComponent
  }
];
