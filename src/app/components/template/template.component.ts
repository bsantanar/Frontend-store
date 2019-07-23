import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { UploadService } from 'src/app/services/upload.service';
import { UploadComponent } from './upload/upload.component';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit, AfterViewInit {
  @ViewChild('codeeditor') private codeEditor;
  codedTemplate:string = `<h1>Load and Compile the example</h1>`;
  viewBuilder: boolean = false;
  viewUploader: boolean = false;
  assetsList: any[] = [];
  editorForm: FormGroup;
  fileRichText: File;
  fileHtmlCoded: File;

  constructor( private location: Location, public dialog: MatDialog, public uploadService: UploadService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.editorForm = new FormGroup({
      'editor': new FormControl(null)
    })
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
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

  get richText(){
    return this.editorForm.get("editor").value;
  }

  get htmlCoded(){
    return this.codeEditor.codeMirror.getDoc().getValue();
  }

  clearRichText(){
    this.editorForm.reset();
  }
  clearHtmlCoded(){
    this.codeEditor.codeMirror.getDoc().setValue(``);
  }

  uploadImageDialog(){
    let dialogRef = this.dialog.open(UploadComponent, {
      width: '50%',
      height: '50%',
    })
  }

  saveRichText(){
    let htmlText = this.richText;
    let blob = new Blob([htmlText], {type: 'text/html'});
    let arrayOfBlob = new Array<Blob>();
    arrayOfBlob.push(blob);
    this.fileRichText = new File(arrayOfBlob, "testRich.html", {type: 'text/html'});
    //console.log(this.fileRichText);
    this.uploadService.uploadHtml(this.fileRichText).subscribe(
      res => {
        //console.log(res);
        Swal.fire({
          type: 'success',
          title: res['message']
        });
      },
      err => {
        //console.log(err);
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err
        });
      }
    );
    // // IE doesn't allow using a blob object directly as link href
    // // instead it is necessary to use msSaveOrOpenBlob
    // if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    //   window.navigator.msSaveOrOpenBlob(blob);
    //   return;
    // }
    //Download Html file
    // let a = document.createElement('a');
    // let url = window.URL.createObjectURL(blob);
    // a.download = 'file.html';
    // a.href = url;
    // a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
    // // For Firefox it is necessary to delay revoking the ObjectURL
    // setTimeout(function () {
    //   window.URL.revokeObjectURL(url);
    //   a.remove();
    // }, 100);
  }

  saveHtmlCoded(){
    let codeText = this.htmlCoded;
    codeText = `<!doctype html>
    
    <head>
        <meta charset="utf-8">
        <base href="/">
    
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    
    </head>` + codeText;
    let blob = new Blob([codeText], {type: 'text/html'});
    let arrayOfBlob = new Array<Blob>();
    arrayOfBlob.push(blob);
    this.fileHtmlCoded = new File(arrayOfBlob, "testCoded.html", {type: 'text/html'});
    //console.log(this.fileHtmlCoded);
    this.uploadService.uploadHtml(this.fileHtmlCoded).subscribe(
      res => {
        //console.log(res);
        Swal.fire({
          type: 'success',
          title: res['message']
        });
      },
      err => {
        //console.log(err);
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err
        });
      }
    );
  }

  exampleHtmlCode(){
    let editor = this.codeEditor.codeMirror;
    let doc = editor.getDoc();
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

}
