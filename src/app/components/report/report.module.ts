import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { ReportComponent } from './report.component';
import { ReportListComponent } from './report-list/report-list.component';
import { ReportNewComponent } from './report-new/report-new.component';
import { ReportEditComponent } from './report-edit/report-edit.component';
import {ReportRoutes} from './report.routing'

import { NgSelectModule } from '@ng-select/ng-select';
import { MaterialModule } from '../../shared/material.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    NgSelectModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ReportRoutes)
  ],
  declarations: [ReportComponent, ReportListComponent, ReportNewComponent, ReportEditComponent]
})
export class ReportModule { }
