import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit, AfterViewInit {
  @ViewChild('codeeditor') private codeEditor;
  a:string = `<h1>Press compile button</h1>`;
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
    /*doc.setValue(`<div class="container">
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
      `);*/
      doc.setValue(`<div class="container" style="margin-top:30px">
      <div class="row">
        <div class="col-sm-4">
          <h2>About Me</h2>
          <h5>Photo of me:</h5>
          <div class="fakeimg">Fake Image</div>
          <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
          <h3>Some Links</h3>
          <p>Lorem ipsum dolor sit ame.</p>
          <ul class="nav nav-pills flex-column">
            <li class="nav-item">
              <a class="nav-link active" href="#">Active</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Disabled</a>
            </li>
          </ul>
          <hr class="d-sm-none">
        </div>
        <div class="col-sm-8">
          <h2>TITLE HEADING</h2>
          <h5>Title description, Dec 7, 2017</h5>
          <div class="fakeimg">Fake Image</div>
          <p>Some text..</p>
          <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
          <br>
          <h2>TITLE HEADING</h2>
          <h5>Title description, Sep 2, 2017</h5>
          <div class="fakeimg">Fake Image</div>
          <p>Some text..</p>
          <p>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
        </div>
      </div>
    </div>`);
  }

  backClicked() {
    this.location.back();
  }
  show(){
    this.a = this.codeEditor.codeMirror.getDoc().getValue(); 
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
