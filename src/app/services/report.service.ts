import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private API_URL="http://localhost:8000"
  constructor(private httpClient:HttpClient) {}
  //Lay danh dach report theo ma khoa
  getAll(idKhoa){
    return this.httpClient.get<any>(`${this.API_URL}/report/get-all/${idKhoa}`)
  }
  getReportById(id){
    return this.httpClient.get<any>(`${this.API_URL}/report/${id}`)
  }
  //Lay danh dach category theo ma khoa
  getKhoaHasCategory(){
    return this.httpClient.get<any>(`${this.API_URL}/khoa-has-category/1`)
  }

  // Request create category api
  saveItem(newReport){
    return this.httpClient.post<any>(`http://localhost:3000/api/report`,newReport)
  }

  //Cap nhat bao cao
  updateReport(report:any){
    
    return this.httpClient.put<any>(`${this.API_URL}/report/update/${report.id}`,report)
  }
  //Cap nhat trang thai bao cao
  updateStatus(idBaoCao){
    return this.httpClient.put<any>(`${this.API_URL}/report/update-status`,{idBaoCao:idBaoCao})
  }

  //Lay thong tin bao cao
  getItem(idReport){
    return this.httpClient.get<any>(`${this.API_URL}/report/${idReport}`)
  }

  //Lay danh dach category theo ma giao ban
  getReportHasCategory(idReport){
    return this.httpClient.get<any>(`${this.API_URL}/giaoban-has-category/${idReport}`)
  }
  //Lay danh sach hang muc by id bao cao
  getDanhSachHangMucByIdReport(idReport){
    return this.httpClient.get<any>(`${this.API_URL}/report/get-list-hang-muc/${idReport}`)
  }
  getDanhSachHangMucPresent(idReport){
    return this.httpClient.get<any>(`${this.API_URL}/report/get-list-hang-muc-present/${idReport}`)
  }
  //Lay danh sach bao cao da trinh chieu
  
  getReport(idKhoa: number, check: number){
    return this.httpClient.get<any>(`${this.API_URL}/report/get-all/${idKhoa}/${check}`)
  }
  
}
