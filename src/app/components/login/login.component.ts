import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private location: Location, private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}')]
        )],
      password: ['', Validators.required]
    })
  }

  backClicked() {
    this.location.back();
  }

  login(){
    let loggedUser = {};
    loggedUser["email"] = this.loginForm.get('email').value;
    loggedUser["password"] = this.loginForm.get('password').value;
    console.log(loggedUser);
    this.auth.loginUser(loggedUser).subscribe(res => console.log(res), err => console.log(err));
  }

}
