import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-affective',
  templateUrl: './affective.component.html',
  styleUrls: ['./affective.component.css']
})
export class AffectiveComponent implements OnInit {

  affectiveForm: FormGroup;
  templates: any = [];

  constructor( private fb: FormBuilder, public dialogRef: MatDialogRef<AffectiveComponent>,
    @Inject(MAT_DIALOG_DATA) public data, public uploadService: UploadService) { }

  ngOnInit() {
    this.affectiveForm = this.fb.group({
      id: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      time: [-1, Validators.compose([Validators.required, Validators.min(-1)])],
      avatar: ['', Validators.required],
      answerType: ['', Validators.required],
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
    let affectiveObj = this.affectiveForm.value;
    console.log(affectiveObj);
    this.dialogRef.close(affectiveObj);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
