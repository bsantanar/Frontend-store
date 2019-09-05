import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.css']
})
export class TestDetailComponent implements OnInit {

  questions = [];
  constructor(public dialogRef: MatDialogRef<TestDetailComponent>, @Inject(MAT_DIALOG_DATA) public data,
  private questionService: QuestionsService) { }

  ngOnInit() {
    this.data.questions.forEach(q => {
      this.questions.push(q);
      let idx = this.data.questions.indexOf(q);
      this.questionService.getQuestion(q).subscribe(
        res => {
          this.questions[idx] = res['question'];
        }
      );
    });
  }

}
