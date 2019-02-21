import { Report } from '../../models/report.model';

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
    tieu_de_khong_dau: 'Tieu de khong dau'
  }
];
