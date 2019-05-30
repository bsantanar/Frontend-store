import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  documentForm: FormGroup;
  submitted = false;

  constructor(private location: Location, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.documentForm = this.formBuilder.group({
      docName: ['', Validators.required],
      docURL: ['', Validators.required],
      maskedURL: ['', [Validators.required, Validators.email]],
      docTitle: ['', [Validators.required, Validators.minLength(6)]],
      localeCode: ['', Validators.required],
      domain: ['', Validators.required],
      task: ['', Validators.required],
      keywords: [[], Validators.required],
      searchSnippet: ['', Validators.required]

    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.documentForm.controls; }

  onSubmit() {

    // stop here if form is invalid
    if (this.documentForm.controls.docURL.errors) {
      alert('Invalid data.')
      return;
    }
    this.submitted = true;
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.documentForm.value))
  }

  backClicked() {
    this.location.back();
  }

}
