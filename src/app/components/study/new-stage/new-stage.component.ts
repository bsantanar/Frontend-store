import { Component, OnInit, Inject } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-stage',
  templateUrl: './new-stage.component.html',
  styleUrls: ['./new-stage.component.css']
})
export class NewStageComponent implements OnInit {

  selectedType:any = {};
  typesStages = [];
  constructor(public dialogRef: MatDialogRef<NewStageComponent>, private utils: UtilsService) { }

  ngOnInit() {
    this.typesStages = this.utils.getTypesStages();
  }
  onNoClick(){
    this.dialogRef.close();
  }
  loadStageType(){
    this.dialogRef.close(this.selectedType.type);
  }
}
