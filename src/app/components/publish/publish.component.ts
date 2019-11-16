import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { StudyService } from 'src/app/services/study.service';
import { StudyDetailComponent } from '../study/study-detail/study-detail.component';
import { MatDialog } from '@angular/material';

import { AuthService } from 'src/app/services/auth.service';
import { DocumentsService } from 'src/app/services/documents.service';
import { QuestionnairesService } from 'src/app/services/questionnaires.service';
import { StagesService } from 'src/app/services/stages.service';
import { PublishesService } from 'src/app/services/publishes.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {


  myStudies = [];
  activeStudy:any = null;
  stateStudy:string = "This study is not published";
  publish:any = {};
  loadedItems:number = 0;
  totalItems:number = 2;

  constructor(private location: Location, private studyService: StudyService, private dialog: MatDialog,
    private userService: AuthService, private docService: DocumentsService, private testService: QuestionnairesService,
    private stageService: StagesService, private publishService: PublishesService) { }

  ngOnInit() {
    this.getMyStudies();
  }

  getMyStudies(){
    this.studyService.getMyStudies().subscribe(
      res => {
        this.myStudies = res['studies'];
      }
    );
  }

  getUserInfo(){
    this.userService.getUser(this.activeStudy.user).subscribe(
      res => {
        this.publish.user = res['user'];
        this.loadedItems++;
      },
      err => {}
    );
  }

  getTestInfo(index: number){
    this.totalItems++;
    let stage = this.activeStudy.stages[index];
    this.testService.getQuestionnaire(stage['questionnaire']).subscribe(
      res => {
        stage['questionnaire'] = res['questionnaire'];
        this.loadedItems++;
      },
      err => {}
    );
  }

  getStageInfo(index: number){
    this.totalItems++;
    this.stageService.getStage(this.activeStudy.stages[index]).subscribe(
      res => {
        this.activeStudy.stages[index] = res['stage'];
        this.loadedItems++;
        if(res['stage']['questionnaire']) {
          this.getTestInfo(index);
        }
      },
      err => {}
    );
  }

  getDocs(){
    this.docService.getMyDocs().subscribe(
      res => {
        this.publish.docs = res['documents'];
        this.loadedItems++;
      },
      err => {}
    );
  }

  viewStudyDetails(study: any){
      const dialogRef = this.dialog.open(StudyDetailComponent, {
        width: '900px',
        data: study
      });
      dialogRef.afterClosed().subscribe();
  }

  generatePublish(){
    this.stateStudy = "Loading components of simulation";
    this.publish.study = this.activeStudy;
    this.publish.password = this.activeStudy._id;
    this.getUserInfo();
    this.getDocs();
    let stages = this.activeStudy.stages;
    for (let i = 0; i < stages.length; i++) {
      this.getStageInfo(i);
    }
  }

  publishStudy(){
    this.publishService.newPublish(this.publish).subscribe(
      res => {
        console.log(res);
      },
      err => {}
    );
  }

  loadStudy(study: any){
    this.activeStudy = study;
  }

  backClicked() {
    this.location.back();
  }

}
