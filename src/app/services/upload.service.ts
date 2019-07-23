import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  private imageUrl = 'http://localhost:3000/upload-image';
  private htmlUrl = 'http://localhost:3000/upload-html';

  constructor( private http: HttpClient ) {}

  public uploadImage(file: File){
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.imageUrl, formData);
  }

  public uploadHtml(file: File){
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.htmlUrl, formData);
  }

}
