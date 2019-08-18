import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-critical-eval',
  templateUrl: './critical-eval.component.html',
  styleUrls: ['./critical-eval.component.css']
})
export class CriticalEvalComponent implements OnInit {

  constructor( private fb: FormBuilder, public dialogRef: MatDialogRef<CriticalEvalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

}
