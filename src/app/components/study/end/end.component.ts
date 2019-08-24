import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent implements OnInit {

  endForm: FormGroup;

  constructor( private fb: FormBuilder, public dialogRef: MatDialogRef<EndComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.endForm = this.fb.group({
      id: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      time: [-1, Validators.compose([Validators.required, Validators.min(-1)])]
    });
  }


  save(){
    let endObj = this.endForm.value;
    console.log(endObj);
    this.dialogRef.close(endObj);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
