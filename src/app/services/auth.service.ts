import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerURL = "http://localhost:3000/register";
  private loginURL = "http://localhost:3000/login";
  private profileUrl = 'http://localhost:3000/me';

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

  public profile(){
    return this.http.get(this.profileUrl);
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

}
