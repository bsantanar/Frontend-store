import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UploadService } from 'src/app/services/upload.service';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  progress
  canBeClosed = true
  primaryButtonText = 'Upload'
  showCancelButton = true
  uploading = false
  uploadSuccessful = false

  @ViewChild('file') file
  //public files: Set<File> = new Set()
  public files = [];

  constructor(public dialogRef: MatDialogRef<UploadComponent>, public uploadService: UploadService) { }

  ngOnInit() {
  }

  addFiles() {
    this.file.nativeElement.click();
  }

  onFilesAdded() {
    const files: { [key: string]: File } = this.file.nativeElement.files;
    for (let key in files) {
      if (!isNaN(parseInt(key))) {
        this.files.push(files[key]);
      }
    }
    console.log(this.files);
  }

  closeDialog() {
    // if everything was uploaded already, just close the dialog
    if (this.uploadSuccessful) {
      return this.dialogRef.close();
    }
  
    // set the component state to "uploading"
    this.uploading = true;
  
    // // start the upload and save the progress map
    // this.progress = this.uploadService.uploadImage(this.files);
  
    // // convert the progress map into an array
    // let allProgressObservables = [];
    // for (let key in this.progress) {
    //   allProgressObservables.push(this.progress[key].progress);
    // }
  
    // Adjust the state variables
  
  
    // The dialog should not be closed while uploading
    this.canBeClosed = false;
    this.dialogRef.disableClose = true;
  
    // When all progress-observables are completed...
    this.uploadService.uploadImage(this.files[0]).subscribe(
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
