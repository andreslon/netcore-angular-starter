import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClientFullModel } from './client.model';
export class ClientService {
  private baseUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') _baseUrl: string) {
    this.baseUrl = _baseUrl;
  } 
  getAll(sort: string, search: string, page: number, pageSize: number = 1) {
    const requestUrl =
      `${this.baseUrl}api/Clients?sort=${sort}&search=${search}&page=${page + 1}&search=${pageSize}`;
    return this.http.get(requestUrl);
  } 
  get(id: string) {
    const requestUrl = `${this.baseUrl}api/Clients/${id}`;
    return this.http.get(requestUrl);
  } 
  delete(id: string) {
    const requestUrl = `${this.baseUrl}api/Clients/${id}`;
    return this.http.delete(requestUrl);
  } 
  addUpdate(body: ClientFullModel) {
    if (body.id) {
      const requestUrl = `${this.baseUrl}api/Clients/${body.id}`;
      return this.http.put(requestUrl, body);
    } else {
      const requestUrl = `${this.baseUrl}api/Clients`;
      return this.http.post(requestUrl, body);
    }
  }
}
