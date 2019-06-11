import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { CdkDragDrop, moveItemInArray  } from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogRef} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { TitleEditComponent } from '../test/title-edit.component';

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

  stagesDB:string[] = ['test1', 'test2', 'test3'];
  createdStages = this.stagesDB;

  idAux:number = 0;

  stages:any[] = [];

  newStudy:object = {
    title: 'New Study',
    questions: ''
  }

  constructor(private location: Location, public dialog: MatDialog) {
  }

  ngOnInit() {
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

  addStage(type:number){
    let typeName = this.typesStages.find(a => a.id===type).type;
    let aux = {
      title: `${typeName} stage`,
      id: this.idAux
    };
    this.idAux++;
    this.stages.push(aux);
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
    this.createdStages = this.stagesDB.filter(word => word.includes(name));
    console.log(this.createdStages);
  }

  deleteStage(stage: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: stage.title
      });
    dialogRef.afterClosed().subscribe(result => {
        if(result) {
          let index = this.stages.map( a => {
              return a.id;
            } ).indexOf(stage.id);
          this.stages.splice(index, 1);
        }
      });
  }
}
