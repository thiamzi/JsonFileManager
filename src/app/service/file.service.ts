import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  url = "http://127.0.0.1:4000/api/";

  constructor(private http: HttpClient) { }

  public CreerJSonFile(data, nom: any): Observable<any> {
    return this.http.post(`${this.url}create/${nom}`, data);
  }

  public GetJsonFiles(): Observable<any> {
    return this.http.get(`${this.url}`);
  }

  public GetOneJsonFile(nom): Observable<any> {
    return this.http.get(`${this.url}${nom}`);
  }

  public EditJSonFile(data, nom: any): Observable<any> {
    return this.http.put(`${this.url}edit/${nom}`, data);
  }

  public DeleteJsnFile(nom) {
    return this.http.delete(`${this.url}delete/${nom}`);
  }
}
