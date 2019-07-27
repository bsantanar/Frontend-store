import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UploadService } from 'src/app/services/upload.service';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  serviceUsed;
  canBeClosed = true
  primaryButtonText = 'Upload'
  showCancelButton = true
  uploading = false
  uploadSuccessful = false

  @ViewChild('file') file
  //public files: Set<File> = new Set()
  public files = [];

  constructor(public dialogRef: MatDialogRef<UploadComponent>, public uploadService: UploadService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  checkFile(file: File){
    switch (this.data){
      case 2:
        if(file.type.split('/')[1] === 'html'){
          return true;
        }
        break;
      case 4:
        if(file.type.split('/')[0] === 'image'){
          return true;
        }
        break;
      case 1:
        if(file.type.split('/')[1] === 'json'){
          return true;
        }
        break;
    }
    
    Swal.fire({
      type: 'error',
      title: 'Oops...',
      text: 'File extension not expected'
    });
    return false;
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        let file = files[key];
        if(this.checkFile(file)){
          this.files.push(files[key]);
        }
      }
    }
    //console.log(this.files);
  }

  closeDialog() {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      return this.dialogRef.close();
    }
  
    if(this.files.length > 0){
      // set the component state to "uploading"
      this.uploading = true;
    
      // The dialog should not be closed while uploading
      this.canBeClosed = false;
      this.dialogRef.disableClose = true;
    
      // When all progress-observables are completed...
      this.files.forEach(file => {
        switch(this.data){
          case 2:
            this.uploadHtml(file);
            break;
          case 4:
            this.uploadImage(file);
            break;
          case 1:
            this.uploadJson(file);
            break;
        }
      });
    }
  }

  uploadImage(file: File){
    this.uploadService.uploadImage(file).subscribe(
      res => {
        // The OK-button should have the text "Finish" now
        this.primaryButtonText = 'Finish';
        // Hide the cancel-button
        this.showCancelButton = false;
        // ... the dialog can be closed again...
        this.canBeClosed = true;
        this.dialogRef.disableClose = false;
    
        // ... the upload was successful...
        this.uploadSuccessful = true;
    
        // ... and the component is no longer uploading
        this.uploading = false;
        //console.log(res);
        Swal.fire({
          type: 'success',
          title: res['message']
        });
      },
      err => {
        // ... the dialog can be closed again...
        this.canBeClosed = true;
    
        // ... the upload was successful...
        this.uploadSuccessful = false;
    
        // ... and the component is no longer uploading
        this.uploading = false;
        //console.log(err);
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err
        });
      }
    );
  }

  uploadHtml(file: File){
    this.uploadService.uploadHtml(file).subscribe(
      res => {
        // The OK-button should have the text "Finish" now
        this.primaryButtonText = 'Finish';
        // Hide the cancel-button
        this.showCancelButton = false;
        // ... the dialog can be closed again...
        this.canBeClosed = true;
        this.dialogRef.disableClose = false;
    
        // ... the upload was successful...
        this.uploadSuccessful = true;
    
        // ... and the component is no longer uploading
        this.uploading = false;
        //console.log(res);
        Swal.fire({
          type: 'success',
          title: res['message']
        });
      },
      err => {
        // ... the dialog can be closed again...
        this.canBeClosed = true;
    
        // ... the upload was successful...
        this.uploadSuccessful = false;
    
        // ... and the component is no longer uploading
        this.uploading = false;
        //console.log(err);
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err
        });
      }
    );
  }

  uploadJson(file: File){
    this.uploadService.uploadJson(file).subscribe(
      res => {
        // The OK-button should have the text "Finish" now
        this.primaryButtonText = 'Finish';
        // Hide the cancel-button
        this.showCancelButton = false;
        // ... the dialog can be closed again...
        this.canBeClosed = true;
        this.dialogRef.disableClose = false;
    
        // ... the upload was successful...
        this.uploadSuccessful = true;
    
        // ... and the component is no longer uploading
        this.uploading = false;
        //console.log(res);
        Swal.fire({
          type: 'success',
          title: res['message']
        });
      },
      err => {
        // ... the dialog can be closed again...
        this.canBeClosed = true;
    
        // ... the upload was successful...
        this.uploadSuccessful = false;
    
        // ... and the component is no longer uploading
        this.uploading = false;
        //console.log(err);
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: err
        });
      }
    );
  }

}
