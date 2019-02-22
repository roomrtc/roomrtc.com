import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxPaginationModule} from 'ngx-pagination';
import {MaterialModule} from '../../shared/material.module';

import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserNewComponent } from './user-new/user-new.component';

import { UserRoutes } from './user.routing';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoutes),
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    MaterialModule,
    NgxPaginationModule,
  ],
  declarations: [UserListComponent, UserComponent, UserNewComponent]
})
export class UserModule { }
