import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CdkDragDrop, moveItemInArray  } from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogRef} from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { TitleEditComponent } from '../test/title-edit.component';

//Stages
import { AffectiveComponent } from './affective/affective.component';
import { CollectionComponent } from './collection/collection.component';
import { CriticalEvalComponent } from './critical-eval/critical-eval.component';
import { EndComponent } from './end/end.component';
import { InstructionsComponent } from './instructions/instructions.component';
import { SearchComponent } from './search/search.component';
import { SynthesisComponent } from './synthesis/synthesis.component';
import { TaskQuestionsComponent } from './task-questions/task-questions.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { StagesService } from 'src/app/services/stages.service';
import Swal from 'sweetalert2';
import { AssetsService } from 'src/app/services/assets.service';
import { UploadService } from 'src/app/services/upload.service';
import { StudyService } from 'src/app/services/study.service';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit {

  typesStages:any[] = [
    {
      type: 'Affective(SAM)',
      id: 1
    },
    {
      type: 'Task Questions',
      id: 2
    },
    {
      type: 'Instructions',
      id: 3
    },
    {
      type: 'Tutorial',
      id: 4
    },
    {
      type: 'Search',
      id: 5
    },
    {
      type: 'Collection',
      id: 6
    },
    {
      type: 'Critical Evaluation',
      id: 7
    },
    {
      type: 'Synthesis',
      id: 8
    },
    {
      type: 'End',
      id: 9
    }];

  stagesDB:any[] = [];
  createdStages;

  idAux:number = 0;

  stages:any[] = [];


  studyForm: FormGroup;
  advancedMode: boolean = false;
  isEdit: boolean = false;
  idEdit: string;
  showNewStage: boolean;
  showRepository: boolean;
  showStore: boolean;
  showHide: boolean;
  myLocales = [];
  myDomains = [];
  myTasks = [];
  myModals = [];
  myStudies = [];

  constructor(private location: Location, public dialog: MatDialog, private stageService: StagesService, 
    private fb: FormBuilder, private assetsService: AssetsService, private uploadService: UploadService,
    private studyService: StudyService) {}

  ngOnInit() {
    this.getMyStages();
    this.getMyDomains();
    this.getMyTasks();
    this.getMyLocales();
    this.getMyModals();
    this.getMyStudies();
    this.showNewStage = this.showRepository = this.showStore = this.showHide = false;
    this.studyForm = this.fb.group({
      id: ['New Study Title', Validators.required],
      locale: ['', Validators.required],
      domain: ['', Validators.required],
      task: ['', Validators.required],
      maxGlobalTime: [-1, Validators.compose([Validators.required, Validators.min(-1)])],
      minBookmarks: [3, Validators.compose([Validators.required, Validators.min(1)])],
      maxBookmarks: [3, Validators.compose([Validators.required, Validators.min(1)])],
      minSnippetsPerPage: [2, Validators.compose([Validators.required, Validators.min(1)])],
      maxSnippetsPerPage:[2, Validators.compose([Validators.required, Validators.min(1)])],
      minSnippetWordLength: [5, Validators.compose([Validators.required, Validators.min(1)])],
      maxSnippetWordLength: [20, Validators.compose([Validators.required, Validators.min(1)])],
      snippetWordTruncateThreshold: [20, Validators.compose([Validators.required, Validators.min(1)])],
      minSynthesisWordLength: [50, Validators.compose([Validators.required, Validators.min(1)])],
      minSynthesisCharLength: [425, Validators.compose([Validators.required, Validators.min(1)])],
      syhtesisAutosaveInterval: [30, Validators.compose([Validators.required, Validators.min(30)])],
      maxStars: [3, Validators.min(3)],
      taskPage: ['', Validators.required],
      replaceWithRelevantDocuments: [false],
      avatar: ['', Validators.required],
      stages: this.fb.array([])
    });
    this.studyForm.controls['stages'].setValidators([Validators.required]);
  }

  

  loadStudy(study: any){
    this.isEdit = true;
    this.stages = [];
    this.idEdit = study._id;
    this.studyForm.patchValue({
      id: study.id,
      locale: study.locale,
      avatar: study.avatar,
      domain: study.domain,
      task: study.task,
      maxGlobalTime: study.maxGlobalTime,
      minBookmarks: study.minBookmarks,
      maxBookmarks: study.maxBookmarks,
      minSnippetWordLength: study.minSnippetWordLength,
      maxSnippetWordLength: study.maxSnippetWordLength,
      minSnippetsPerPage: study.minSnippetsPerPage,
      maxSnippetsPerPage: study.maxSnippetsPerPage,
      snippetWordTruncateThreshold: study.snippetWordTruncateThreshold,
      minSynthesisCharLength: study.minSynthesisCharLength,
      minSynthesisWordLength: study.minSynthesisWordLength,
      syhtesisAutosaveInterval: study.syhtesisAutosaveInterval,
      maxStars: study.maxStars,
      taskPage: study.taskPage,
      replaceWithRelevantDocuments: study.replaceWithRelevantDocuments
    });
    study.stages.forEach(s => {
      this.getStagesForm.push(new FormControl(s));
      this.stageService.getStage(s).subscribe(
        res => {
          this.stages.push(res['stage']);
        }
      );
    });
    //console.log(this.studyForm.value);
  }

  getMyStudies(){
    this.studyService.getMyStudies().subscribe(
      res => {
        this.myStudies = res['studies'];
      }
    );
  }

  getMyStages(){
    this.stageService.getMyStages().subscribe(
      res => {
        this.createdStages = res['stages'];
        this.stagesDB = this.createdStages;
      },
      err => {
      }
    );
  }

  getMyLocales(){
    this.assetsService.getMyLocales().subscribe(
      res => {
        this.myLocales = res['locales'];
      }
    );
  }

  getMyDomains(){
    this.assetsService.getMyDomains().subscribe(
      res => {
        this.myDomains = res['domains'];
      }
    );
  }

  getMyTasks(){
    this.assetsService.getMyTasks().subscribe(
      res => {
        this.myTasks = res['tasks'];
      }
    );
  }

  getMyModals(){
    this.uploadService.getHtml("1").subscribe(
      res => {
        this.myModals = res['html'];
      }
    );
  }

  activateNewStage(){
    if(this.showNewStage){
      this.showNewStage = this.showRepository = this.showStore = this.showHide = false;
    } else{
      this.showNewStage = this.showHide = true;
      this.showRepository = this.showStore = false;
    }
  }

  activateRepository(){
    if(this.showRepository){
      this.showNewStage = this.showRepository = this.showStore = this.showHide = false;
    } else{
      this.showRepository = this.showHide = true;
      this.showNewStage = this.showStore = false;
    }
  }

  activateStore(){
    if(this.showStore){
      this.showNewStage = this.showRepository = this.showStore = this.showHide = false;
    } else{
      this.showStore = this.showHide = true;
      this.showRepository = this.showNewStage = false;
    }
  }

  hideStages(){
    this.showNewStage = this.showRepository = this.showStore = this.showHide = false;
  }

  clearForm(){
    this.studyForm.reset();
    this.isEdit = false;
    this.stages = [];
    this.studyForm.controls['id'].setValue('New Study Title');
    while (this.getStagesForm.length > 0){
      this.getStagesForm.removeAt(0);
    }
  }

  backClicked() {
    this.location.back();
  }

  saveTitle(value:string){
    this.studyForm.controls['id'].setValue(value);
  }

  get getStagesForm(){
    return this.studyForm.get('stages') as FormArray;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.stages, event.previousIndex, event.currentIndex);
    //console.log(this.stages);
  }

  addStageDB(stage){
    let aux = stage;
    aux['idAux'] = this.idAux;
    this.idAux++;
    this.stages.push(aux);
    this.getStagesForm.push(new FormControl(stage._id));
  }

  newStage(typeName:string, stage = undefined){
    let stageComp, dialogRef;
    switch (typeName){
      case 'Affective(SAM)':
        stageComp = AffectiveComponent;
        break;
      case 'Collection':
        stageComp = CollectionComponent;
        break;
      case 'Critical Evaluation':
        stageComp = CriticalEvalComponent;
        break;
      case 'End':
        stageComp = EndComponent;
        break;
      case 'Instructions':
        stageComp = InstructionsComponent;
        break;
      case 'Search':
        stageComp = SearchComponent;
        break;
      case 'Synthesis':
        stageComp = SynthesisComponent;
        break;
      case 'Task Questions':
        stageComp = TaskQuestionsComponent;
        break;
      case 'Tutorial':
        stageComp = TutorialComponent;
        break;
    }
    if(stage != undefined){
      dialogRef = this.dialog.open(stageComp, {
        width: '600px',
        data: {
          typeName,
          isEdit: true,
          stage
        }
      });
    } else {
      dialogRef = this.dialog.open(stageComp, {
        width: '600px',
        data: {
          typeName,
          isEdit: false
        }
      });
    }
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(stage != undefined){
          this.getMyStages();
        } else {
          //console.log(result);
          let aux = result;
          aux['idAux'] = this.idAux;
          this.idAux++;
          this.stages.push(aux);
          this.getMyStages();
          this.getStagesForm.push(new FormControl(aux._id));
        }
      }
    });
  }

  editTitle(value:string){
    const dialogRef = this.dialog.open(TitleEditComponent, {
      width: '250px',
      data: {title: value}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(!result){
        return;
      }
      this.saveTitle(result.title)
    });
  }

  searchStage(name: string){
    this.createdStages = this.stagesDB.filter(obj => obj.id.includes(name));
  }

  deleteStageDB(stage){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: stage.id
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.stageService.deleteStage(stage._id).subscribe(
          res => {
            this.stages = this.stages.filter(s => {s._id != stage._id});
            this.getMyStages();
          }
        );
      }
    });
  }

  deleteStage(stage: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: stage.id
      });
    dialogRef.afterClosed().subscribe(result => {
        if(result) {
          let index = this.stages.map( a => {
              return a.idAux;
            } ).indexOf(stage.idAux);
          this.stages.splice(index, 1);
          this.getStagesForm.removeAt(this.getStagesForm.value.findIndex(q => q == stage._id));
        }
      });
  }

  deleteStudy(study:any){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: study.id
      });
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.studyService.deleteStudy(study._id).subscribe(
          res => {
            this.stages = this.stages.filter(s => {s._id != study._id});
            this.getMyStudies();
            this.clearForm();
          },
          err => {
            //console.log(err);
          }
        );
      }
    });
  }

  submitStudy(){
    while (this.getStagesForm.length > 0){
      this.getStagesForm.removeAt(0);
    }
    this.stages.forEach(s => {
      this.getStagesForm.push(new FormControl (s._id))
    });
    let newStudy = this.studyForm.value;
    newStudy['user'] = localStorage.getItem('userId');
    //console.log(newStudy);
    this.studyService.newStudy(newStudy).subscribe(
      res => {
        this.getMyStudies();
        this.clearForm();
      },
      err => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err
        });
        //console.log(err);
      }
    );
  }

  editStudy(){
    while (this.getStagesForm.length > 0){
      this.getStagesForm.removeAt(0);
    }
    this.stages.forEach(s => {
      this.getStagesForm.push(new FormControl (s._id))
    });
    let putStudy = this.studyForm.value;
    putStudy['user'] = localStorage.getItem('userId');
    this.studyService.editStudy(this.idEdit, putStudy).subscribe(
      res => {
        this.getMyStudies();
        this.clearForm();
      },
      err => {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err
        });
      }
    );
    
  }
}
