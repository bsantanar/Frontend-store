import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { DocumentsService } from 'src/app/services/documents.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  documentForm: FormGroup;
  myDocuments: any = [];

  constructor(private location: Location, private formBuilder: FormBuilder, private docService: DocumentsService) { }

  ngOnInit() {
    this.getDocuments();
    this.documentForm = this.formBuilder.group({
      docName: ['', Validators.required],
      docURL: ['', Validators.required],
      maskedURL: [''],
      docTitle: ['', [Validators.required, Validators.minLength(6)]],
      localeCode: ['', Validators.required],
      domain: ['', Validators.required],
      task: ['', Validators.required],
      keywords: this.formBuilder.array([]),
      searchSnippet: [''],
      relevant: [false],
      tags: new FormControl()

    });
  }

  getDocuments(){
    this.docService.getMyDocs().subscribe(
      res => {
        this.myDocuments = res['documents'];
      },
      err => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err
        });
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() { return this.documentForm.controls; }

  get getKeywords(){ return this.documentForm.get('keywords') as FormArray }

  addKeyword(){
    this.getKeywords.push(this.formBuilder.control(''));
  }

  onSubmit() {
    let keyAux = [];
    if(this.documentForm.controls['tags'].value){

      this.documentForm.controls['tags'].value.forEach(tag => {
        keyAux.push(tag.value);
      });
    }
    let docObj = {
      docName: this.documentForm.controls['docName'].value,
      title: this.documentForm.controls['docTitle'].value,
      locale: this.documentForm.controls['localeCode'].value,
      relevant: this.documentForm.controls['relevant'].value,
      task: this.documentForm.controls['task'].value,
      domain: this.documentForm.controls['domain'].value,
      keywords: keyAux,
      date: new Date(),
      url: this.documentForm.controls['docURL'].value,
      maskedUrl: this.documentForm.controls['maskedURL'].value,
      searchSnippet: this.documentForm.controls['searchSnippet'].value,
      user: localStorage.getItem('userId')
    }
    //console.log(docObj);
    this.docService.newDoc(docObj).subscribe(
      res => {
        //console.log(res);
      },
      err => {
        //console.log(err);
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err
        });
      }
    )
  }

  show(){
    console.log(this.documentForm.controls['localeCode'].value);
  }

  backClicked() {
    this.location.back();
  }

}
