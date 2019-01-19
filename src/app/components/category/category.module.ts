import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router'
import {NgSelectModule, NG_SELECT_DEFAULT_CONFIG} from '@ng-select/ng-select'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';        
import {CalendarModule} from 'primeng/calendar';
import {AccordionModule} from 'primeng/accordion';
import { MaterialModule } from '../../shared/material.module';

import { CategoryComponent } from './category.component';
import { CategoryNewComponent } from './category-new/category-new.component';
import { CategoryRoutes } from './category.routing';


@NgModule({
  imports: [
    CommonModule,
    CalendarModule,
    MaterialModule,
    AccordionModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(CategoryRoutes)
  ],
  providers:[
    {
      provide: NG_SELECT_DEFAULT_CONFIG,
      useValue: {
          notFoundText: 'Custom not found'
      }
    }
  ],
  declarations: [CategoryComponent, CategoryNewComponent]
})
export class CategoryModule { }
