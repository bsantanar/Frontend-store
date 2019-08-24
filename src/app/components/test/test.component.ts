import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material';
import { TitleEditComponent } from './title-edit.component';
import { CdkDragDrop, moveItemInArray  } from '@angular/cdk/drag-drop';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { NewQuestionComponent } from '../new-question/new-question.component';
import { QuestionsService } from 'src/app/services/questions.service';
import { SynthesisService } from 'src/app/services/synthesis.service';
import { QuestionnairesService } from 'src/app/services/questionnaires.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  typesQuestions:any[] = [
    {
      type: 'Text',
      typeId: 1
    },
    {
      type: 'Paragraph',
      typeId: 2
    },
    {
      type: 'Multiple Choice',
      typeId: 3
    },
    {
      type: 'Checkbox',
      typeId: 4
    },
    {
      type: 'List',
      typeId: 5
    },
    {
      type: 'Scale',
      typeId: 6
    },
    {
      type: 'Rating',
      typeId: 7
    },
    {
      type: 'Date',
      typeId: 8
    },
    {
      type: 'Time',
      typeId: 9
    }];

  editQuestionnaire: Boolean = false;
  editQuestId: String = null;

  editSynthesis: Boolean = false;
  editSynthId: String = null;

  idAux:number = 0;

  questions:any[] = [];

  questionsDB:any[] = [];
  synthesisDB:any[] = [];
  questionnairesDB: any[] = [];
  createdQuestions:any[] = [];

  question: object = {
      id: null as number,
      title: null as string,
      type: null as number,
      required: null as boolean,
      content: null as object
  }

  synthesisForm: FormGroup;
  questionnaireForm: FormGroup;

  constructor(private location: Location, private modalService: NgbModal, private formBuilder: FormBuilder, 
    public dialog: MatDialog, private questionsService: QuestionsService, private synthesisService: SynthesisService, 
    private questionnaireService: QuestionnairesService) { }

  ngOnInit() {
    this.synthesisForm = this.formBuilder.group({
      id: ['', Validators.required],
      title: ['', Validators.required]
    });
    this.questionnaireForm = this.formBuilder.group({
      questionnaireId: ['New Questionnaire', Validators.required],
      instructions: ['', Validators.required],
      questions: this.formBuilder.array([])
    });
    this.questionnaireForm.controls['questions'].setValidators([Validators.required]);
    this.getMyQuestions();
    this.getSynthesisDB();
    this.getQuestionnairesDB();
  }

  getMyQuestions(){
    this.questionsService.getMyQuestions().subscribe(
      res => {
        this.questionsDB = res['questions'];
        this.createdQuestions = this.questionsDB;
      },
      err => {
        console.log(err);
      }
    );
  }

  getSynthesisDB(){
    this.synthesisService.getMySynthesis().subscribe(
      res => {
        this.synthesisDB = res['synthesis'];
      },
      err => {
        console.log(err);
      }
    );
  }

  getQuestionnairesDB(){
    this.questionnaireService.getMyQuestionnaires().subscribe(
      res => {
        this.questionnairesDB = res['questionnaires'];
      },
      err => {
        console.log(err);
      }
    );
  }

  saveTitle(value:string){
    this.questionnaireForm.controls['questionnaireId'].setValue(value);
  }

  backClicked() {
    this.location.back();
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

  get getQuestions(){
    return this.questionnaireForm.get('questions') as FormArray;
  }

  addQuestion(type:any){
    const dialogRef = this.dialog.open(NewQuestionComponent, {
      width: '600px',
      data: type
    });
    dialogRef.afterClosed().subscribe(newQuestion => {
      if(newQuestion){
        // let aux = {
        //   title: newQuestion.title,
        //   questionId: newQuestion.questionId,
        //   hint: newQuestion.hint,
        //   required: newQuestion.required,
        //   idAux: this.idAux,
        //   type: type.type,
        //   _id: newQuestion.id,
        //   options: newQuestion.options
        // };
        //console.log(newQuestion);
        setTimeout(() => {
          newQuestion['idAux'] = this.idAux;
          this.idAux++;
          this.questions.push(newQuestion);
          this.getMyQuestions();
          this.getQuestions.push(new FormControl(newQuestion._id));
        }, 500)
      }
    });
  }


  addQuestionDB(question: any){
    let aux = {
      title: question.title,
      questionId: question.questionId,
      hint: question.hint,
      required: question.required,
      idAux: this.idAux,
      type: question.type,
      _id: question._id,
      options: question.options
    };
    this.idAux++;
    this.questions.push(aux);
    this.getQuestions.push(new FormControl(question._id));
  }

  editQuestionDB(question:any){
    const dialogRef = this.dialog.open(NewQuestionComponent, {
      width: '600px',
      data: question
    });
    dialogRef.afterClosed().subscribe(newQuestion => {
      if(newQuestion){
        this.getMyQuestions();
        this.questions = this.questions.filter(q => q._id !== question._id);
      }
    });
  }

  loadQuestionnaire(questionnaire: any, editable: boolean){
    this.questionnaireForm.controls['questionnaireId'].setValue(questionnaire.questionnaireId);
    this.questionnaireForm.controls['instructions'].setValue(questionnaire.instructions);
    while(this.getQuestions.length !== 0){
      this.getQuestions.removeAt(0);
    }
    this.questions = [];
    questionnaire.questions.forEach(q => {
      //console.log(q);
      //this.getQuestions.push(new FormControl(q));
      this.questionsService.getQuestion(q).subscribe(
        res => {
          this.addQuestionDB(res['question']);
        },
        err => {
          console.log(err);
        }
      );
    });
    if(editable){
      this.editQuestionnaire = true;
      this.editQuestId = questionnaire._id;
    } else {
      this.editQuestionnaire = false;
    }
  }

  loadSynthesis(synthesis: any){
    this.synthesisForm.controls['id'].setValue(synthesis.synthesisId);
    this.synthesisForm.controls['title'].setValue(synthesis.title);
    this.editSynthId = synthesis._id;
    this.editSynthesis = true;
  }

  cancelSynthesis(){
    this.synthesisForm.reset();
    this.editSynthesis = false;
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
          this.getQuestions.removeAt(this.getQuestions.value.findIndex(q => q == question._id));
        }
      });
  }

  deleteQuestionDB(question: any){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: question.questionId
    });
    dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.questionsService.deleteQuestion(question._id).subscribe(
            res => {
              this.createdQuestions = this.createdQuestions.filter(q => q._id !== question._id);
              this.questions = this.questions.filter(q => q._id !== question._id);
            },
            err => {
              console.log(err);
            }
          );
        }
      });
  }

  deleteQuestionnaire(questionnaire: any) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: questionnaire.questionnaireId
      });
    dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.questionnaireService.deleteQuestionnaire(questionnaire._id).subscribe(
            res => {
              this.questionnairesDB = this.questionnairesDB.filter(q => q._id !== questionnaire._id);
              this.questionnaireForm.reset();
              this.questionnaireForm.controls['questionnaireId'].setValue("New Questionnaire");
              this.questions = [];
            },
            err => {
              console.log(err);
            }
          );
        }
      });
  }

  deleteSynthesis(synthesis: any){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
        data: synthesis.synthesisId
      });
    dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.synthesisService.deleteSynthesis(synthesis._id).subscribe(
            res => {
              this.synthesisDB = this.synthesisDB.filter(q => q._id !== synthesis._id);
            },
            err => {
              console.log(err);
            }
          );
        }
      });
  }


  searchQuestion(name: string){
    this.createdQuestions = this.questionsDB.filter(
      word => word.title.toLowerCase().includes(name.toLowerCase())
      );
  }


  submitQuestionnaire(id?: string){
    let newQuestionnaire = {};
    newQuestionnaire["questionnaireId"] = this.questionnaireForm.get('questionnaireId').value;
    newQuestionnaire["instructions"] = this.questionnaireForm.get('instructions').value;
    newQuestionnaire["questions"] = this.questionnaireForm.get('questions').value;
    newQuestionnaire["user"] = localStorage.getItem('userId');
    //console.log(newQuestionnaire);
    if(!this.editQuestionnaire){
      this.questionnaireService.newQuestionnaire(newQuestionnaire).subscribe(
        res => {
          //console.log(res);
          this.questionnairesDB.push(res['questionnaire']);
          this.questionnaireForm.reset();
          this.questionnaireForm.controls['questionnaireId'].setValue("New Questionnaire");
          this.questions = [];
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.questionnaireService.editQuestionnaire(id, newQuestionnaire).subscribe(
        res => {
          this.questionnaireForm.reset();
          this.editQuestionnaire = false;
          this.getQuestionnairesDB();
          this.questionnaireForm.controls['questionnaireId'].setValue("New Questionnaire");
          this.questions = [];
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  submitSynthesis(id?: string) {
    let newSynth = {};
    newSynth["title"] = this.synthesisForm.get('title').value;
    newSynth["synthesisId"] = this.synthesisForm.get('id').value;
    newSynth["user"] = localStorage.getItem('userId');
    if(!this.editSynthesis){
      this.synthesisService.newSynthesis(newSynth).subscribe(
        res => {
          this.synthesisDB.push(res['synthesis']);
          this.synthesisForm.reset();
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.synthesisService.editSynthesis(id, newSynth).subscribe(
        res => {
          this.synthesisForm.reset();
          this.editSynthesis = false;
          this.getSynthesisDB();
        },
        err => {
          console.log(err);
        }
      );
    }
    
  }

}
