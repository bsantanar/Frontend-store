import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { AssetsService } from 'src/app/services/assets.service';
import { UploadService } from 'src/app/services/upload.service';
import { MatDialog } from '@angular/material';
import { NewAssetComponent } from '../document/new-asset/new-asset.component';
import { EditAssetComponent } from '../document/edit-asset/edit-asset.component';
import { UploadComponent } from '../template/upload/upload.component';



@Component({
  selector: 'app-quick',
  templateUrl: './quick.component.html',
  styleUrls: ['./quick.component.css']
})
export class QuickComponent implements OnInit {

  generalForm: FormGroup;
  assetsForm: FormGroup;
  publicContent: boolean = false;
  myLocales = [];
  myDomains = [];
  myTasks = [];
  myModals = [];

  constructor(private location: Location, private fb: FormBuilder, private assetsService: AssetsService, private uploadService: UploadService, 
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getMyLocales();
    this.getMyDomains();
    this.getMyTasks();
    this.getMyModals();
    this.generalForm = this.fb.group({
      id: ['', Validators.required],
      avatar: ['', Validators.required],
      public: [false],
      tags: new FormControl()
    });
    this.assetsForm = this.fb.group({
      locale: ['', Validators.required],
      domain: ['', Validators.required],
      task: ['', Validators.required],
      taskPage: ['', Validators.required]
    });
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

  addAsset(type: number){
    const dialogRef = this.dialog.open(NewAssetComponent, {
      width: '600px',
      data: type
    });
    dialogRef.afterClosed().subscribe(newAsset => {
      if(newAsset){
        switch(type){
          case 1: 
            this.getMyLocales();
            break;
          case 2:
            this.getMyDomains();
            break;
          case 3:
            this.getMyTasks();
            break;
        }
      }
    });
  }

  editAsset(type: number){
    const dialogRef = this.dialog.open(EditAssetComponent, {
      width: '600px',
      data: type
    });
    dialogRef.afterClosed().subscribe(asset => {
      if(asset){
        this.assetsForm.reset();
        switch(type){
          case 1: 
            this.getMyLocales();
            break;
          case 2:
            this.getMyDomains();
            break;
          case 3:
            this.getMyTasks();
            break;
        }
      }
    });
  }

  uploadDialog(type: number){
    let dialogRef = this.dialog.open(UploadComponent, {
      width: '600px',
      data: type
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getMyModals();
    });
  }

  backClicked() {
    this.location.back();
  }

}
