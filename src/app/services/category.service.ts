import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API_URL = 'http://localhost:3000/api';

  constructor(private httpClient: HttpClient) {

  }
  getAll() {
    return this.httpClient.get<any>(`${this.API_URL}/category/get-all`);
  }
  getItems() {
    return this.httpClient.get<any>(`${this.API_URL}/category`);
  }
  getItemsGroup() {
    return this.httpClient.get(`${this.API_URL}/item/group`);
  }
  // Request create category api
  saveItem(newCategory) {
    return this.httpClient.post(`${this.API_URL}/item`, newCategory);
  }
  getDataSelect() {
    return this.httpClient.get<any>(`${this.API_URL}/item/child`);
  }
  // updateItem(newCategory){
  //   return this.httpClient.put(`${this.API_URL}/category`,newCategory)
  // }
  // deleteItem(idCategory){
  //   return this.httpClient.delete(`${this.API_URL}/category`,newCategory)
  // }
  getListCategoryByIdReport(idReport) {
    return this.httpClient.get<any>(`${this.API_URL}/category/get-list-category/${idReport}`);
  }
}
