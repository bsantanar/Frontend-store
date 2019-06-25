import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private questionsURL = "http://localhost:3000/questions";

  constructor( private http: HttpClient) { }

  public getAllQuestions(){
    return this.http.get(this.questionsURL);
  }
}
