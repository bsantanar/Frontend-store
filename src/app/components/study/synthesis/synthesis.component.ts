import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadService } from 'src/app/services/upload.service';
import { SynthesisService } from 'src/app/services/synthesis.service';

@Component({
  selector: 'app-synthesis',
  templateUrl: './synthesis.component.html',
  styleUrls: ['./synthesis.component.css']
})
export class SynthesisComponent implements OnInit {

  synthesisForm: FormGroup;
  images: any = [];
  modals: any = [];
  forms: any = [];

  constructor( private fb: FormBuilder, public dialogRef: MatDialogRef<SynthesisComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private uploadService: UploadService, private synthService: SynthesisService) { }

  ngOnInit() {
    this.synthesisForm = this.fb.group({
      id: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      time: [-1, Validators.compose([Validators.required, Validators.min(-1)])],
      alert: [10, Validators.compose([Validators.required, Validators.min(-1)])],
      tips: ['', Validators.required],
      form: ['', Validators.required],
      slides: ['', Validators.required],
      stage: ['', Validators.required]
    });
    this.uploadService.getHtml("1").subscribe(
      res => {
        this.modals = res['html'];
      }
    );
    this.uploadService.getImages().subscribe(
      res => {
        this.images = res['images']
      }
    );
    this.synthService.getMySynthesis().subscribe(
      res => {
        this.forms = res['synthesis']
      }
    );
  }

  save(){
    let synthObj = this.synthesisForm.value;
    console.log(synthObj);
    this.dialogRef.close(synthObj);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
