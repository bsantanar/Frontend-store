import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import * as CodeMirror from 'codemirror';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit, AfterViewInit {
  @ViewChild('codeeditor') private codeEditor;
  a:string = `<h1>hola</h1>`;
  viewBuilder: boolean = false;
  viewUploader: boolean = false;
  assetsList: any[] = [];
  constructor( private location: Location) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    const editor = this.codeEditor.codeMirror;
    const doc = editor.getDoc();
    doc.setValue(`<div class="container">
    <div class="row">
      <div class="col-md-2 col-sm-2 col-xs-2">
        <b>{{"tutorial.email.inbox" | translate}} (1)</b><br>
        {{"tutorial.email.drafts" | translate}}<br>
        {{"tutorial.email.sent" | translate}}<br>
        {{"tutorial.email.allMail" | translate}}
      </div>
      <div class="col-md-10 col-sm-10 col-xs-10">
        <div class="row">
          <div class="col-md-2 col-sm-2 col-xs-2">
            <img src="images/avatars/{{instructions.avatar}}_portrait.png" class="img-circle img-responsive">
          </div>
          <div class="col-md-10 col-sm-10 col-xs-10">
            <b>{{"tutorial.email.from" | translate}}:</b> Sarah Jones <sarah.jones@myemail.com><br>
            <b>{{"tutorial.email.to" | translate}}:</b> You<br>
            <b>{{"tutorial.email.subject" | translate}}:</b> Need help with our newspaper article! 
          </div>
        </div>
        <hr>
        <div class="row">
          <h2>Hey! I need your help!</h2>
            
          <p>We are making an article for our school newspaper and we need some help recovering information from our local network.</p>
    
          <p>Don't worry, in the following step I will give you some advice for making this task.</p>
    
          <p>Your help will be very appreciated.</p>
    
          <p>Sarah Jones<br>
          School Newspaper Chief Editor</p>
        </div>
      </div>
    </div>
  </div>
      `);
  }

  backClicked() {
    this.location.back();
  }
  show(){
    console.log(this.codeEditor.codeMirror.getDoc().getValue()); 
  }

  activeBuilder(){
    this.viewUploader = false;
    this.viewBuilder = true;
  }

  activeUploader(){
    this.viewBuilder = false;
    this.viewUploader = true;
  }

  fillAssetsList(type: number){
    switch(type){
      //Locales
      case 1: {
        this.assetsList = [];
        this.assetsList.push({Name: 'TestLocale'});
        this.assetsList.push({Name: 'TestLocale'});
        break;
      }
      //Modals
      case 2: {
        this.assetsList = [];
        this.assetsList.push({Name: 'TestModal'});
        break;
      }
      //Templates
      case 3: {
        this.assetsList = [];
        this.assetsList.push({Name: 'TestTemplate'});
        break;
      }
      //Images
      case 4: {
        this.assetsList = [];
        this.assetsList.push({Name: 'TestImage'});
        break;
      }
    }
  }

}
