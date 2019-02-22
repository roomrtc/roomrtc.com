import { Report } from '../../models/report.model';
import { User } from 'src/app/models/user.model';

/**
 * Fake user login
 */
export const UserFakeData: User[] = [{
  id: 1,
  username: 'vunb',
  password: 'vunb',
  firstName: 'Vu Bao Nhu',
  fullName: 'vunb'
}, {
  id: 2,
  username: 'test',
  password: 'test',
  firstName: 'test',
  fullName: 'test (vunb)'
}];

/**
 * Fake data Report
 */
export const ReportFakeData: Report[] = [
  {
    tieu_de_bao_cao: 'Báo cáo ngày 21/02/2019',
    code: '1234',
    ghi_chu: 'ghi chú',
    id: 1234567890,
    is_template: false,
    ngay_bao_cao: new Date,
    status: 1,
    ten_nguoi_bao_cao: 'Vu Bao Nhu',
    tieu_de_khong_dau: 'Tieu de khong dau',
    items: [{
        id: Date.toString(),
        idItemParent: 2,
        ten_hang_muc: 'Tổng số khám',
        parent: {
          id: 2,
          ten_hang_muc: 'Thống kê bệnh nhân'
        }
      },
      {
        id: 20,
        idItemParent: 2,
        ten_hang_muc: 'Viện phí',
        parent: {
          id: 2,
          ten_hang_muc: 'Thống kê bệnh nhân'
        }
      }
    ]
  }
];
