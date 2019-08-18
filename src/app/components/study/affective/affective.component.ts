import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-affective',
  templateUrl: './affective.component.html',
  styleUrls: ['./affective.component.css']
})
export class AffectiveComponent implements OnInit {

  affectiveForm: FormGroup;

  constructor( private fb: FormBuilder, public dialogRef: MatDialogRef<AffectiveComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.affectiveForm = this.fb.group({
      id: ['', Validators.required]
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
