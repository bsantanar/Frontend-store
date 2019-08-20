import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  //Upload services
  private imageUrl = 'http://localhost:3000/upload-image';
  private htmlUrl = 'http://localhost:3000/upload-html';
  private jsonUrl = 'http://localhost:3000/upload-locale';

  //Get uploaded files
  private myImagesUrl = 'http://localhost:3000/my-images';
  private myHtmlUrl = 'http://localhost:3000/my-html';
  private myJsonUrl = 'http://localhost:3000/my-json';

  //Download files
  private imageDownloadUrl = 'http://localhost:3000/download-image/';
  private htmlDownloadUrl = 'http://localhost:3000/download-html/';
  private localeDownloadUrl = 'http://localhost:3000/download-locale/';

  //Delete files
  private deleteImageUrl = 'http://localhost:3000/delete-image/';
  private deleteHtmlUrl = 'http://localhost:3000/delete-html/';
  private deleteLocaleUrl = 'http://localhost:3000/delete-locale/';

  constructor( private http: HttpClient ) {}

  public uploadImage(file: File){
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.imageUrl, formData);
  }

  public uploadHtml(file: File, type: string){
    //Set type of html file
    let headers = new HttpHeaders({'type': type});
    //Append file
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.htmlUrl, formData, {headers});
  }

  public uploadJson(file: File){
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.jsonUrl, formData);
  }

  public getImages(){
    return this.http.get(this.myImagesUrl);
  }

  public getHtml(type: string){
    //Set type of html file
    let headers = new HttpHeaders({'type': type});
    return this.http.get(this.myHtmlUrl, {headers});
  }

  public getLocales(){
    return this.http.get(this.myJsonUrl);
  }

  public downloadFile(name, type){
    //Set type of html file
    let typeHtml = (type - 1).toString();
    let headers = new HttpHeaders({'type': typeHtml});
    switch (type){
      case 1:
        return this.http.post(this.localeDownloadUrl + name, '', {responseType: "arraybuffer"});
      case 2:
        return this.http.post(this.htmlDownloadUrl + name, '', {responseType: "arraybuffer", headers});
      case 3:
        return this.http.post(this.htmlDownloadUrl + name, '', {responseType: "arraybuffer", headers});
      case 4:
        return this.http.post(this.imageDownloadUrl + name, '', {responseType: "arraybuffer"})
    }
  }

  public deleteFile(name, type){
    //Set type of html file
    let typeHtml = (type - 1).toString();
    let headers = new HttpHeaders({'type': typeHtml});
    switch (type){
      case 1:
        return this.http.delete(this.deleteLocaleUrl + name);
      case 2:
        return this.http.delete(this.deleteHtmlUrl + name, {headers});
      case 3:
        return this.http.delete(this.deleteHtmlUrl + name, {headers});
      case 4:
        return this.http.delete(this.deleteImageUrl + name);
    }
  }

}
