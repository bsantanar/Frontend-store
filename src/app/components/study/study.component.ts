import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CdkDragDrop, moveItemInArray  } from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogRef} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  newStudy:object = {
    title: 'New Study',
    questions: ''
  }

  constructor(private location: Location, public dialog: MatDialog, private stageService: StagesService) {}

  ngOnInit() {
    this.getMyStages();
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

  backClicked() {
    this.location.back();
  }

  saveTitle(value:string){
    this.newStudy['title'] = value;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.stages, event.previousIndex, event.currentIndex);
  }

  addStageDB(stage){
    let aux = stage;
    aux['idAux'] = this.idAux;
    this.idAux++;
    this.stages.push(aux);
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
        //console.log(result);
        let aux = result;
        aux['idAux'] = this.idAux;
        this.idAux++;
        this.stages.push(aux);
        this.getMyStages();
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
        }
      });
  }
}
