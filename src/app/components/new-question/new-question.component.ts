import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css']
})
export class NewQuestionComponent implements OnInit {

  newQuestionForm: FormGroup;
  isOptions: Boolean = false;

  constructor( private fb: FormBuilder, public dialogRef: MatDialogRef<NewQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    }

  ngOnInit() {
    this.newQuestionForm = this.fb.group({
      title: ['', Validators.compose([
        Validators.required
      ])],
      questionId: ['', Validators.compose([
        Validators.required
      ])],
      hint: [''],
      required: [false]
    });
    if(this.data.id == 3){
      this.isOptions = true;
      this.newQuestionForm.addControl('options', new FormControl([], Validators.required));
    }
  }

  save(){
    console.log(this.newQuestionForm.value);
    this.dialogRef.close(this.newQuestionForm.value);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}