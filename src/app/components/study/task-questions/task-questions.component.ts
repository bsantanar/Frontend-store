import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-task-questions',
  templateUrl: './task-questions.component.html',
  styleUrls: ['./task-questions.component.css']
})
export class TaskQuestionsComponent implements OnInit {

  constructor( private fb: FormBuilder, public dialogRef: MatDialogRef<TaskQuestionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

}
