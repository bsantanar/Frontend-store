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
import { QuestionsService } from 'src/app/services/questions.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {

  clicked:boolean = false;
  errorLoad:boolean = false;
  published:boolean = false;
  loading: boolean = false;
  myStudies = [];
  myPublishes = [];
  activeStudy:any = null;
  stateStudy:string = "Click to load components and publish the study";
  errorMessage: string = "";
  publish:any = {};
  loadedItems:number = 0;
  totalItems:number = 2;

  constructor(private location: Location, private studyService: StudyService, private dialog: MatDialog,
    private userService: AuthService, private docService: DocumentsService, private testService: QuestionnairesService,
    private stageService: StagesService, private publishService: PublishesService, private questionService: QuestionsService) { }

  ngOnInit() {
    this.loading = true;
    this.getMyStudies();
    this.getMyPublishes();
  }

  getMyPublishes(){
    this.publishService.getMyPublishes().subscribe(
      res => {
        this.myPublishes = res['publishes'];
      }
    );
  }

  getMyStudies(){
    this.studyService.getMyStudies().subscribe(
      res => {
        this.myStudies = res['studies'];
        this.loading = false;
      }
    );
  }

  getUserInfo(){
    this.userService.getUser(this.activeStudy.user).subscribe(
      res => {
        this.publish.owner = res['user'];
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
        if(stage['questionnaire'] == null){
          this.errorMessage = "Questionnaire not found!";
          this.errorLoad = true;
          this.loadedItems--;
          return;
        }
        stage['questionnaire'] = res['questionnaire'];
        this.loadedItems++;
        this.totalItems += stage['questionnaire']['questions'].length;
        for (let i = 0; i < stage['questionnaire']['questions'].length; i++) {
          this.questionService.getQuestion(stage['questionnaire']['questions'][i]).subscribe(
            res => {
              if(res['question'] == null){
                this.errorMessage = "Question not found!";
                this.errorLoad = true;
                this.loadedItems--;
                return;
              }
              stage['questionnaire']['questions'][i] = res['question'];
              this.loadedItems++;
            }
          );  
        }
      },
      err => {}
    );
  }

  getStageInfo(index: number){
    this.totalItems++;
    this.stageService.getStage(this.activeStudy.stages[index]).subscribe(
      res => {
        if(res == null || res['stage'] == null){
          this.errorLoad = true;
          this.errorMessage = "Stage not found!";
          this.loadedItems--;
          return;
        }
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
        if((res as any)){
          this.publish.docs = res['documents'];
        }
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
    this.clicked = true;
    this.stateStudy = "Loading components of simulation";
    this.publish.study = this.activeStudy;
    //this.publish.password = this.activeStudy._id;
    this.publish.questionnaires = [];
    this.publish.questions = [];
    this.publish.user = localStorage.getItem('userId');
    this.getUserInfo();
    this.getDocs();
    let stages = this.activeStudy.stages;
    if(typeof stages[0] != 'object'){
      for (let i = 0; i < stages.length; i++) {
        this.getStageInfo(i);
      }
    }
    //console.log(this.publish);
  }

  //Metodo que formatea la publicacion de facil acceso en NEURONE
  cleanPublish(){
    delete this.publish.study._id;
    for (const doc of this.publish.docs) {
      delete doc._id;
    }
    if(this.publish.study.taskPage){
      let path = `${this.publish.study.user}/modal/${this.publish.study.taskPage}`;
      this.publish.study.taskPage = path;
    }
    for (const stage of this.publish.study.stages) {
      delete stage._id;
      if(stage.questionnaire){
        delete stage.questionnaire._id;
        this.publish.questionnaires.push(stage.questionnaire);
        for (let i = 0; i < stage.questionnaire.questions.length; i++) {
          delete stage.questionnaire.questions[i]._id;
          this.publish.questions.push(stage.questionnaire.questions[i]);
          stage.questionnaire.questions[i] = stage.questionnaire.questions[i].questionId;
        }
      }
      if(stage.slides){
        for (let i = 0; i < stage.slides.length; i++) {
          let path = `${stage.user}/image/${stage.slides[i]}`;
          stage.slides[i] = path;
        }
      }
      if(stage.page){
        let path = `${stage.user}/template/${stage.page}`;
        stage.page = path;
      }
      if(stage.tips){
        let path = `${stage.user}/modal/${stage.tips}`;
        stage.tips = path;
      }
      if(stage.avatarImage){
        let path = `${stage.user}/image/${stage.avatarImage}`;
        stage.avatarImage = path;
      }
    }
    this.publish.stages = this.publish.study.stages;
    for (const stage of this.publish.stages) {
      if(stage.questionnaire){
        stage.questionnaire = stage.questionnaire.questionnaireId;
      }
      if(stage.stage){
        stage.urlParams = {stage: stage.stage};
        delete stage.stage;
      }
    }
    this.publish.study.locale.path = `${this.publish.study.user}/application/locale-${this.publish.study.locale.code}.json`;
  }

  publishStudy(){
    this.cleanPublish();
    //console.log(this.publish);
    this.publishService.newPublish(this.publish).subscribe(
      res => {
        this.published = true;
        this.getMyPublishes();
      },
      err => {}
    );
  }

  loadStudy(study: any){
    this.clicked = this.published = this.errorLoad = false;
    this.activeStudy = study;
    this.publish = {};
    this.stateStudy = "Click to load components and publish the study";
    this.errorMessage = "";
    this.loadedItems = 0;
    this.totalItems = 2;
  }

  deletePublish(publish){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: publish.study.id
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.publishService.deletePublish(publish._id).subscribe(
          res => {
            this.getMyPublishes();
          }
        );
      }
    });
  }

}
