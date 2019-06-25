import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SynthesisService {

  private synthesisURL = "http://localhost:3000/synthesis";

  constructor( private http: HttpClient ) { }

  public getAllSynthesis(){
    return this.http.get(this.synthesisURL);
  }

  public newSynthesis(synthesis){
    return this.http.post(this.synthesisURL, synthesis);
  }
}
