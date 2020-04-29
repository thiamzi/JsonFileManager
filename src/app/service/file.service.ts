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

  public EditJSonFile(data, ancnom: any , nouvnom : any): Observable<any> {
    return this.http.put(`${this.url}edit/${ancnom}/${nouvnom}`, data);
  }

  public DeleteJsnFile(nom) {
    return this.http.delete(`${this.url}delete/${nom}`);
  }

  valider(url) {
    let nom;
    let chaine = url.substring(0, 12)
    let chaine2 = url.substring(0, 11)
    let chaine3 = url.substring(0, 8)
    let chaine4 = url.substring(0, 7)
    let chaine5 = url.substring(0, 4)

    if (chaine === "https://www.") {
      nom = url.substring(12, url.indexOf(".", 12));
      return nom+".json";
    }
    else if (chaine3 === "https://") {
      nom = url.substring(8, url.indexOf(".", 8));
      return nom+".json";
    }
    if (chaine2 === "http://www.") {
      nom = url.substring(11, url.indexOf(".", 11));
      return nom+".json";
    }
    else if (chaine4 === "http://") {
      nom = url.substring(7, url.indexOf(".", 7));
      return nom+".json";
    }
    if (chaine5 === "www.") {
      nom = url.substring(4, url.indexOf(".", 4));
      return nom+".json";
    }
  }
}
