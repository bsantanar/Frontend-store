import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublishesService {

  private publishUrl = environment.apiUrl + 'publish';

  constructor(private http: HttpClient) { }

  newPublish(publish){
    return this.http.post(this.publishUrl, publish);
  }
}
