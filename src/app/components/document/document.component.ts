import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  documentForm: FormGroup;
  tags = ['asd', 'qwe'];

  constructor(private location: Location, private formBuilder: FormBuilder) { }

  ngOnInit() {
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

  // convenience getter for easy access to form fields
  get f() { return this.documentForm.controls; }

  get getKeywords(){ return this.documentForm.get('keywords') as FormArray }

  addKeyword(){
    this.getKeywords.push(this.formBuilder.control(''));
  }

  onSubmit() {
    let keyAux = [];
    this.documentForm.controls['tags'].value.forEach(tag => {
      keyAux.push(tag.value);
    });
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
    }
    console.log(docObj);
  }

  show(){
    console.log(this.documentForm.controls['localeCode'].value);
  }

  backClicked() {
    this.location.back();
  }

}
