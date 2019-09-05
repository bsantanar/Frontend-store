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
import { QuestionnairesService } from 'src/app/services/questionnaires.service';
import Swal from 'sweetalert2';
import { TestDetailComponent } from './test-detail/test-detail.component';
import { AddTestStoreComponent } from './add-test-store/add-test-store.component';

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

  idAux:number = 0;

  questions:any[] = [];

  questionsDB:any[] = [];
  questionnairesDB: any[] = [];
  createdQuestions:any[] = [];
  storeQuestionnaires:any[] = [];
  filterStore:any[] = [];
  showNewQuestion: boolean = false;
  showRepository: boolean = false;
  showStore: boolean = false;
  showHide: boolean = false;

  questionnaireForm: FormGroup;

  constructor(private location: Location, private modalService: NgbModal, private formBuilder: FormBuilder, 
    public dialog: MatDialog, private questionsService: QuestionsService, private questionnaireService: QuestionnairesService) { }

  ngOnInit() {
    this.questionnaireForm = this.formBuilder.group({
      questionnaireId: ['New Questionnaire', Validators.required],
      instructions: ['', Validators.required],
      questions: this.formBuilder.array([]),
      public: [false],
      tags: new FormControl()
    });
    this.questionnaireForm.controls['questions'].setValidators([Validators.required]);
    this.getMyQuestions();
    this.getQuestionnairesDB();
    this.getStoreQuestionnaires();
  }

  getMyQuestions(){
    this.questionsService.getMyQuestions().subscribe(
      res => {
        this.questionsDB = res['questions'];
        this.createdQuestions = this.questionsDB;
      },
      err => {
        //console.log(err);
      }
    );
  }

  getQuestionnairesDB(){
    this.questionnaireService.getMyQuestionnaires().subscribe(
      res => {
        this.questionnairesDB = res['questionnaires'];
      },
      err => {
        //console.log(err);
      }
    );
  }

  getStoreQuestionnaires(){
    this.questionnaireService.getPublicQuestionnaires().subscribe(
      res => {
        //console.log(res);
        this.storeQuestionnaires = res['public'].filter(
          q => q.createdBy != localStorage.getItem('userId')
        );
        this.filterStore = this.storeQuestionnaires;
      },
      err => {
        //console.log(err);
      }
    );
  }

  activateNewQuestion(){
    if(this.showNewQuestion){
      this.showNewQuestion = this.showRepository = this.showStore = this.showHide = false;
    } else{
      this.showNewQuestion = this.showHide = true;
      this.showRepository = this.showStore = false;
    }
  }

  activateRepository(){
    if(this.showRepository){
      this.showNewQuestion = this.showRepository = this.showStore = this.showHide = false;
    } else{
      this.showRepository = this.showHide = true;
      this.showNewQuestion = this.showStore = false;
    }
  }

  activateStore(){
    if(this.showStore){
      this.showNewQuestion = this.showRepository = this.showStore = this.showHide = false;
    } else{
      this.showStore = this.showHide = true;
      this.showRepository = this.showNewQuestion = false;
    }
  }

  hideQuestions(){
    this.showNewQuestion = this.showRepository = this.showStore = this.showHide = false;
  }

  saveTitle(value:string){
    this.questionnaireForm.controls['questionnaireId'].setValue(value);
  }

  backClicked() {
    this.location.back();
  }

  makePublic(){
    this.questionnaireForm.controls['public'].setValue(true);
    this.questionnaireForm.controls['tags'].setValidators([Validators.required]);
    this.questionnaireForm.controls['tags'].updateValueAndValidity();
  }

  cancelPublic(){
    this.questionnaireForm.controls['public'].setValue(false);
    this.questionnaireForm.controls['tags'].clearValidators();
    this.questionnaireForm.controls['tags'].updateValueAndValidity();
    //console.log(this.questionnaireForm);
  }

  searchQuestion(name: string){
    this.createdQuestions = this.questionsDB.filter(
      q => q.title.toLowerCase().includes(name.toLowerCase())
      );
  }

  searchTagStore(name: string, clear?: boolean){
    if(clear) this.filterStore = this.storeQuestionnaires;
    else{
      this.filterStore = this.storeQuestionnaires.filter(
        q => q.tags.includes(name)
      );
    }
  }

  viewTestStore(questionnaire: any){
    const dialogRef = this.dialog.open(TestDetailComponent, {
      width: '800px',
      data: questionnaire
    });
    dialogRef.afterClosed().subscribe();
  }

  addTestStore(questionnaire: any){
    const dialogRef = this.dialog.open(AddTestStoreComponent, {
      width: '800px',
      data: questionnaire
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getQuestionnairesDB();
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
    if(this.questions.includes(question._id)){
      let idx = this.questions.indexOf(question._id);
      this.questions[idx] = aux;
    } else{
      this.questions.push(aux);
    }
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
    this.clearForm();
    this.questionnaireForm.controls['questionnaireId'].setValue(questionnaire.questionnaireId);
    this.questionnaireForm.controls['instructions'].setValue(questionnaire.instructions);
    this.questionnaireForm.controls['public'].setValue(questionnaire.public);
    if(questionnaire.tags.length > 0){
      let tagsAux = [];
      for (const tag of questionnaire.tags){
        tagsAux.push({display: tag, value: tag});
      }
      this.questionnaireForm.controls['tags'].setValue(tagsAux);
    }
    //se obtiene cada objeto question relacionado a questionnaire
    while(this.getQuestions.length !== 0){
      this.getQuestions.removeAt(0);
    }
    this.questions = [];
    for (const q of questionnaire.questions) {
      this.questions.push(q);
      this.questionsService.getQuestion(q).subscribe(
        res => {
          this.addQuestionDB(res['question']);
        },
        err => {
          //console.log(err);
        }
      );
    }
    if(editable){
      this.editQuestionnaire = true;
      this.editQuestId = questionnaire._id;
    } else {
      this.editQuestionnaire = false;
    }
  }

  clearForm(){
    this.questionnaireForm.reset();
    this.questions = [];
    this.editQuestionnaire = false;
    this.questionnaireForm.controls['questionnaireId'].setValue('New Questionnaire');
    while(this.getQuestions.length > 0){
      this.getQuestions.removeAt(0);
    }
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



  submitQuestionnaire(id?: string){
    //questions en orden dejado por el usuario
    while(this.getQuestions.length > 0){
      this.getQuestions.removeAt(0);
    }
    this.questions.forEach(q => {
      this.getQuestions.push(new FormControl(q._id))
    });
    //Se elimina el tags del nuevo objeto
    let newQuestionnaire = this.questionnaireForm.value;
    delete newQuestionnaire.tags;
    newQuestionnaire["user"] = localStorage.getItem('userId');
    //Si es publico, se le asigna los tags
    if(newQuestionnaire.public){
      newQuestionnaire.tags = [];
      this.questionnaireForm.controls['tags'].value.forEach(tag => {
        newQuestionnaire.tags.push(tag.value);
      });
    }
    //console.log(newQuestionnaire);
    if(!this.editQuestionnaire){
      this.questionnaireService.newQuestionnaire(newQuestionnaire).subscribe(
        res => {
          //console.log(res);
          this.questionnairesDB.push(res['questionnaire']);
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
    } else {
      this.questionnaireService.editQuestionnaire(id, newQuestionnaire).subscribe(
        res => {
          this.getQuestionnairesDB();
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
  }

}
