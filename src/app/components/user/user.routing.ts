/**
 * User management routing
 */

import { Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const UserRoutes: Routes = [{
  path: '',
  component: UserComponent,
  canActivate: [AuthGuard],
  data: {
    breadcrumb: 'User Management'
  },
  children: [
    {
      path: '',
      redirectTo: 'user-list',
      pathMatch: 'full'
    },
    {
      path: 'user-list',
      component: UserListComponent,
      data: {
        breadcrumb: 'User List',
        title: 'Danh sách tài khoản người dùng'
      }
    }
  ]
}];
