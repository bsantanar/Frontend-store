import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadService } from 'src/app/services/upload.service';
import { QuestionnairesService } from 'src/app/services/questionnaires.service';

@Component({
  selector: 'app-task-questions',
  templateUrl: './task-questions.component.html',
  styleUrls: ['./task-questions.component.css']
})
export class TaskQuestionsComponent implements OnInit {

  taskQuestionForm: FormGroup;
  questionnaires: any = [];
  images: any = [];

  constructor( private fb: FormBuilder, public dialogRef: MatDialogRef<TaskQuestionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private uploadService: UploadService, private qsService: QuestionnairesService) { }

  ngOnInit() {
    this.taskQuestionForm = this.fb.group({
      id: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      time: [-1, Validators.compose([Validators.required, Validators.min(-1)])],
      avatarImage: ['', Validators.required],
      questionnaire: ['', Validators.required],
      stage: ['', Validators.required]
    });
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
    let taskQObj = this.taskQuestionForm.value;
    console.log(taskQObj);
    this.dialogRef.close(taskQObj);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
