import {Component, OnInit} from '@angular/core';
import {ReportService} from '../../../services/report.service';
import {Report} from '../../../models/report.model';

declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent implements OnInit {
  // Config search pipe
  keySearch = '';
  keySearchDraft = '';

  // test pagination
  pdone = 1;
  pdraf = 1;
  collection: any[] = [
    {
      name: 'Jill',
      email: 'jill@email.com',
      age: 15,
      country: undefined,
      child: {state: 'Active'}
    },
    {
      name: 'Henry',
      email: 'henry@email.com',
      age: 10,
      country: undefined,
      child: {state: 'Active'}
    },
    {
      name: 'Meg',
      email: 'meg@email.com',
      age: 7,
      country: null,
      child: {state: 'Active'}
    },
    {
      name: 'Adam',
      email: 'adam@email.com',
      age: 12,
      country: 'United States',
      child: {state: 'Active'}
    },
    {
      name: 'Homer',
      email: 'homer@email.com',
      age: 47,
      country: '',
      child: {state: 'Active'}
    },
    {
      name: 'Samantha',
      email: 'samantha@email.com',
      age: 30,
      country: 'United States',
      child: {state: 'Active'}
    },
    {
      name: 'Amalie',
      email: 'amalie@email.com',
      age: 12,
      country: 'Argentina',
      child: {state: 'Active'}
    },
    {
      name: 'Estefanía',
      email: 'estefania@email.com',
      age: 21,
      country: 'Argentina',
      child: {state: 'Active'}
    },
    {
      name: 'Adrian',
      email: 'adrian@email.com',
      age: 21,
      country: 'Ecuador',
      child: {state: 'Active'}
    },
    {
      name: 'Wladimir',
      email: 'wladimir@email.com',
      age: 30,
      country: 'Ecuador',
      child: {state: 'Inactive'}
    },
    {
      name: 'Natasha',
      email: 'natasha@email.com',
      age: 54,
      country: 'Ecuador',
      child: {state: 'Inactive'}
    },
    {
      name: 'Nicole',
      email: 'nicole@email.com',
      age: 43,
      country: 'Colombia',
      child: {state: 'Inactive'}
    },
    {
      name: 'Michael',
      email: 'michael@email.com',
      age: 15,
      country: 'Colombia',
      child: {state: 'Inactive'}
    },
    {
      name: 'Nicolás',
      email: 'nicole@email.com',
      age: 43,
      country: 'Colombia',
      child: {state: 'Inactive'}
    }
  ];

  // Du lieu danh sach bao cao
  danh_sach_bao_cao: Array<Report>;
  // Danh sach bao cao dang phat trien
  reportDraft: Array<Report>;
  // Danh sach bao cao da trinh chieu
  reportDone: Array<Report>;

  constructor(private reportServices: ReportService) {
    this.danh_sach_bao_cao = [];
    this.reportDraft = [];
    this.reportDone = [];
  }

  ngOnInit() {
    // Lay danh sach bao cao
    this.reportServices.getAll(1)
        .subscribe((data: Array<Report>) => { this.danh_sach_bao_cao = data; });
    // Lay danh sach bao cao da trinh chieu
    this.reportServices.getReport(1, 1)
        .subscribe((data: Array<Report>) => { this.reportDone = data; });
    this.reportServices.getReport(1, 0)
        .subscribe((data: Array<Report>) => { this.reportDraft = data; });
    // Lay danh sach bao cao dang trien
  }

  /**
   * Xem trước bản trình chiếu
   * @param report
   * @param type
   */
  onPreview(report: Report, type: string) {
    console.log('Presenting: ', type, report.id);
    const newUrl =
        `http://localhost:3000/api/report/${report.id}/present/${type}`;

    document.getElementById('presenter').setAttribute('src', newUrl);
    document.getElementById('myNav').style.width = '100%';
  }

  /**
   * Đóng xem trước bản trình chiếu
   */
  closeNav() {
    swal({
      title: 'Bạn có muốn hoàn thành báo cáo không?',
      text:
          'Chú ý, bạn sẽ không thể chỉnh sửa được báo cáo sau khi đã hoàn thành!',
      icon: 'warning',
      buttons: ['Tiếp tục chỉnh sửa', 'Hoàn thành báo cáo'],
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
          return swal('Chúc mừng bạn đã hoàn thành báo cáo',
                      {icon: 'success'});
        } else {
          return Promise.resolve();
        }
      })
      .then(() => {
        // Ẩn khung trình chiếu
        document.getElementById('myNav').style.width = '0%';
      });
  }
  onEdit(report) {}
}
