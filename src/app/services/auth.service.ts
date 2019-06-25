import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerURL = "http://localhost:3000/register";
  private loginURL = "http://localhost:3000/login";

  constructor( private http: HttpClient, private router: Router) { }

  public register(user){
    return this.http.post(this.registerURL, user);
  }

  public loginUser(user){
    return this.http.post(this.loginURL, user);
  }

  public loggedIn(){
    return !!localStorage.getItem('token');
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
