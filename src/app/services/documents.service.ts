import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  private myDocumentsURL = 'http://localhost:3000/my-documents';
  private documentsURL = 'http://localhost:3000/documents';

  constructor(private http: HttpClient) { }

  public getMyDocs(){
    return this.http.get(this.myDocumentsURL);
  }

  public newDoc(document){
    return this.http.post(this.documentsURL, document);
  }

}
