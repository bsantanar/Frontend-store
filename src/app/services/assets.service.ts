import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  private myLocalesURL = 'http://localhost:3000/my-locales';
  private localesURL = 'http://localhost:3000/locales';
  private myDomainsURL = 'http://localhost:3000/my-domains';
  private domainsURL = 'http://localhost:3000/domains';
  private myTasksURL = 'http://localhost:3000/my-tasks';
  private tasksURL = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

  public getMyLocales(){
    return this.http.get(this.myLocalesURL);
  }

  public getMyDomains(){
    return this.http.get(this.myDomainsURL);
  }

  public getMyTasks(){
    return this.http.get(this.myTasksURL);
  }

  public newLocale(locale){
    return this.http.post(this.localesURL, locale);
  }

  public newDomain(domain){
    return this.http.post(this.domainsURL, domain);
  }

  public newTask(task){
    return this.http.post(this.tasksURL, task);
  }

  public editLocale(id, locale){
    return this.http.put(this.localesURL + '/' + id, locale);
  }

  public editDomain(id, domain){
    return this.http.put(this.domainsURL + '/' + id, domain);
  }

  public editTask(id, task){
    return this.http.put(this.tasksURL + '/' + id, task);
  }

  public deleteLocale(id){
    return this.http.delete(this.localesURL + '/' + id);
  }
  
  public deleteDomain(id){
    return this.http.delete(this.domainsURL + '/' + id);
  }

  public deleteTask(id){
    return this.http.delete(this.tasksURL + '/' + id);
  }

}
