import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  modals: any = [];
  images: any = [];

  constructor( private fb: FormBuilder, public dialogRef: MatDialogRef<SearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private uploadService: UploadService) { }

  ngOnInit() {
    this.searchForm = this.fb.group({
      id: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      time: [-1, Validators.compose([Validators.required, Validators.min(-1)])],
      alert: [10, Validators.compose([Validators.required, Validators.min(-1)])],
      tips: ['', Validators.required],
      slides: ['', Validators.required],
      stage: ['', Validators.required]
    });
    this.uploadService.getHtml("1").subscribe(
      res => {
        this.modals = res['html'];
      }
    );
    this.uploadService.getImages().subscribe(
      res => {
        this.images = res['images']
      }
    );
  }

  save(){
    let searchObj = this.searchForm.value;
    console.log(searchObj);
    this.dialogRef.close(searchObj);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
