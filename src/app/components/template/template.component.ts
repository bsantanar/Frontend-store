import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit, AfterViewInit {
  @ViewChild('codeeditor') private codeEditor;
  codedTemplate:string = `<h1>Press compile button</h1>`;
  viewBuilder: boolean = false;
  viewUploader: boolean = false;
  assetsList: any[] = [];
  editorForm: FormGroup;

  constructor( private location: Location) { }

  ngOnInit() {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    })
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    const editor = this.codeEditor.codeMirror;
    const doc = editor.getDoc();
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
    this.codedTemplate = this.codeEditor.codeMirror.getDoc().getValue(); 
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

  submitRichText(){
    console.log(this.editorForm.get("editor").value);
  }

}
