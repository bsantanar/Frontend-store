import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SynthesisService {

  private synthesisURL = "http://localhost:3000/synthesis";
  private mySynthesisURL = "http://localhost:3000/my-synthesis";

  constructor( private http: HttpClient ) { }

  public getAllSynthesis(){
    return this.http.get(this.synthesisURL);
  }

  public getMySynthesis(){
    return this.http.get(this.mySynthesisURL);
  }

  public newSynthesis(synthesis){
    return this.http.post(this.synthesisURL, synthesis);
  }

  public editSynthesis(id, synthesis){
    return this.http.put(this.synthesisURL + '/' + id, synthesis);
  }

  public deleteSynthesis(id){
    return this.http.delete(this.synthesisURL + '/' + id);
  }
}
