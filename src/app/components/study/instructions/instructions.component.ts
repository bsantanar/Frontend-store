import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  instructionsForm: FormGroup;
  templates:any = [];

  constructor( private fb: FormBuilder, public dialogRef: MatDialogRef<InstructionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private uploadService: UploadService) { }

  ngOnInit() {
    this.instructionsForm = this.fb.group({
      id: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      time: [-1, Validators.compose([Validators.required, Validators.min(-1)])],
      page: ['', Validators.required],
      stage: ['', Validators.required]      
    });
    this.uploadService.getHtml("2").subscribe(
      res => {
        this.templates = res['html']
      }
    );
  }

  save(){
    let instructionsObj = this.instructionsForm.value;
    console.log(instructionsObj);
    this.dialogRef.close(instructionsObj);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
