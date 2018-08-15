import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RevealService {
  private API_URL="http://localhost:3000/api"
  private options = { headers: new HttpHeaders().set('Content-Type', 'text/plain') };
  constructor(private httpClient:HttpClient) { }

  updateMarkdown(data){
    // console.log('update')
    return this.httpClient.put<any>(`${this.API_URL}/present/update`,{data:data})
  }
  getMarkDownContent(){
    return this.httpClient.get<any>(`${this.API_URL}/present/getMarkDownContent`)
  }
  save(data){
    return this.httpClient.post<any>(`${this.API_URL}/reveal/save`,data)
  }
}
