import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material';
import { TitleEditComponent } from './title-edit.component';
import { CdkDragDrop, moveItemInArray  } from '@angular/cdk/drag-drop';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { NewQuestionComponent } from '../new-question/new-question.component';
import { QuestionsService } from 'src/app/services/questions.service';
import { SynthesisService } from 'src/app/services/synthesis.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  typesQuestions:any[] = [
    {
      type: 'Text',
      id: 1
    },
    {
      type: 'Paragraph',
      id: 2
    },
    {
      type: 'Multiple Choice',
      id: 3
    },
    {
      type: 'Checkbox',
      id: 4
    },
    {
      type: 'List',
      id: 5
    },
    {
      type: 'Scale',
      id: 6
    },
    {
      type: 'Rating',
      id: 7
    },
    {
      type: 'Date',
      id: 8
    },
    {
      type: 'Time',
      id: 9
    }];

  newForm:object = {
    title: 'New Questionnaire',
    questions: ''
  }

  idAux:number = 0;

  questions:any[] = [];

  questionsDB:any[] = [];
  synthesisDB:any[] = [];

  createdQuestions:any[] = [];

  question: object = {
      id: null as number,
      title: null as string,
      type: null as number,
      required: null as boolean,
      content: null as object
  }

  myForm: FormGroup;
  synthesisForm: FormGroup;

  constructor(private location: Location, private modalService: NgbModal, private formBuilder: FormBuilder, 
    public dialog: MatDialog, private questionsService: QuestionsService, private synthesisService: SynthesisService) { }

  ngOnInit() {
    this.synthesisForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required]
    })
    this.questionsService.getAllQuestions().subscribe(
      res => {
        this.questionsDB = res['questions'];
        this.createdQuestions = this.questionsDB;
      },
      err => {
        console.log(err);
      }
    );
    this.synthesisService.getAllSynthesis().subscribe(
      res => {
        this.synthesisDB = res['synthesis'];
      },
      err => {
        console.log(err);
      }
    );

  }

  submitSynthesis() {
    let newSynth = {};
    newSynth["title"] = this.synthesisForm.get('title').value;
    newSynth["synthesisId"] = this.synthesisForm.get('id').value;
    this.synthesisService.newSynthesis(newSynth).subscribe(
      res => {
        this.synthesisService.getAllSynthesis().subscribe(
          res => {
            this.synthesisDB = res['synthesis'];
          },
          err => {
            console.log(err);
          }
        );
      },
      err => {
        console.log(err);
      }
    );
    
  }

  saveTitle(value:string){
    this.newForm['title'] = value;
  }

  backClicked() {
    this.location.back();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(result);
    }, (reason) => {
    
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

  addQuestion(type:any){
    const dialogRef = this.dialog.open(NewQuestionComponent, {
      width: '350px',
      data: type
    });
    dialogRef.afterClosed().subscribe(newQuestion => {
      if(newQuestion){
        let aux = {
          title: newQuestion.title,
          questionId: newQuestion.questionId,
          hint: newQuestion.hint,
          required: newQuestion.required,
          idAux: this.idAux
        };
        this.idAux++;
        this.questions.push(aux);
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.questions, event.previousIndex, event.currentIndex);
  }

  deleteQuestion(question: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: question.title
      });
    dialogRef.afterClosed().subscribe(result => {
        if(result) {
          let index = this.questions.map( a => {
              return a.idAux;
            } ).indexOf(question.idAux);
          this.questions.splice(index, 1);
        }
      });
  }


  searchQuestion(name: string){
    this.createdQuestions = this.questionsDB.filter(
      word => word.title.toLocaleLowerCase().includes(name.toLocaleLowerCase())
      );
  }
}
