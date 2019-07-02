import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionnairesService {

  private questionnairesURL = "http://localhost:3000/questionnaires";
  private questionnaireURL = "http://localhost:3000/questionnaire/";
  private myQuestionnairesURL = "http://localhost:3000/my-questionnaires";

  constructor( private http: HttpClient) { }

  public getAllQuestionnaires(){
    return this.http.get(this.questionnairesURL);
  }

  public getMyQuestionnaires(){
    return this.http.get(this.myQuestionnairesURL);
  }

  public newQuestionnaire(questionnaire){
    return this.http.post(this.questionnairesURL, questionnaire);
  }

  public getQuestionnaire(id){
    return this.http.get(this.questionnaireURL + id);
  }

  public editQuestionnaire(id, questionnaire){
    return this.http.put(this.questionnaireURL + id, questionnaire);
  }

  public deleteQuestionnaire(id){
    return this.http.delete(this.questionnaireURL + id);
  }
}
