import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadService } from 'src/app/services/upload.service';
import { QuestionnairesService } from 'src/app/services/questionnaires.service';

@Component({
  selector: 'app-critical-eval',
  templateUrl: './critical-eval.component.html',
  styleUrls: ['./critical-eval.component.css']
})
export class CriticalEvalComponent implements OnInit {

  criticalForm: FormGroup;
  images: any = [];
  modals: any = [];
  questionnaires: any = [];

  constructor( private fb: FormBuilder, public dialogRef: MatDialogRef<CriticalEvalComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private uploadService: UploadService, private qsService: QuestionnairesService) { }

  ngOnInit() {
    this.criticalForm = this.fb.group({
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
    this.qsService.getMyQuestionnaires().subscribe(
      res => {
        this.questionnaires = res['questionnaires']
      }
    );
  }

  save(){
    let criticalObj = this.criticalForm.value;
    console.log(criticalObj);
    this.dialogRef.close(criticalObj);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
