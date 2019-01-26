import {Routes} from '@angular/router';
import {ReportListComponent} from './report-list/report-list.component';
import {ReportNewComponent} from './report-new/report-new.component';
import {ReportEditComponent} from './report-edit/report-edit.component';
import {ReportComponent} from './report.component';
export const ReportRoutes: Routes = [
  {
    path: '',
    component: ReportComponent,
    data: {
      breadcrumb: 'Report'
    },
    children: [
      {
        path: '',
        redirectTo: 'report-list',
        pathMatch: 'full'
      }, {
        path: 'report-list',
        component: ReportListComponent,
        data: {
          breadcrumb: 'Report-List',
          title: 'Danh sách báo cáo'
        }
      }, {
        path: 'report-new',
        component: ReportNewComponent,
        data: {
          breadcrumb: 'Report-New',
          title: 'Tạo mới báo cáo'
        }
      }, {
        path: 'report-edit/:id',
        component: ReportEditComponent,
        data: {
          breadcrumb: 'Report-Edit',
          title: 'Chỉnh sửa báo cáo'
        }
      }
    ]
  }
];
