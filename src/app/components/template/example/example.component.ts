import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {

  title: string;

  constructor(public dialogRef: MatDialogRef<ExampleComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    switch (this.data){
      case 2:
        this.title = 'Modal File';
        break;
      case 3:
        this.title = 'Template File';
        break;
    }
  }

}
