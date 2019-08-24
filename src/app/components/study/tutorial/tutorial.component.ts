import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.css']
})
export class TutorialComponent implements OnInit {

  tutorialForm: FormGroup;
  images: any = [];

  constructor( private fb: FormBuilder, public dialogRef: MatDialogRef<TutorialComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private uploadService: UploadService) { }

  ngOnInit() {
    this.tutorialForm = this.fb.group({
      id: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      time: [-1, Validators.compose([Validators.required, Validators.min(-1)])],
      slides: ['', Validators.required],
      stage: ['', Validators.required]
    });
    this.uploadService.getImages().subscribe(
      res => {
        this.images = res['images']        
      }
    );
  }

  save(){
    let tutorialObj = this.tutorialForm.value;
    console.log(tutorialObj);
    this.dialogRef.close(tutorialObj);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
