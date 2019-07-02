import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private questionsURL = "http://localhost:3000/questions";
  private questionURL = "http://localhost:3000/question/";
  private myQuestionsURL = "http://localhost:3000/my-questions";

  constructor( private http: HttpClient) { }

  public getAllQuestions(){
    return this.http.get(this.questionsURL);
  }

  public getMyQuestions(){
    return this.http.get(this.myQuestionsURL);
  }

  public getQuestion(id){
    return this.http.get(this.questionURL + id);
  }

  public newQuestion(question){
    return this.http.post(this.questionsURL, question);
  }

  public editQuestion(id, question){
    return this.http.put(this.questionURL + id, question);
  }

  public deleteQuestion(id){
    return this.http.delete(this.questionURL + id);
  }
}
