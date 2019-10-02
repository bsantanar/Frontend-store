import { Component, OnInit, Inject, SecurityContext } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DocumentsService } from 'src/app/services/documents.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PreviewComponent>, @Inject(MAT_DIALOG_DATA) public data, 
  private docService: DocumentsService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    
    //console.log(this.data);
    this.docService.previewDoc(this.data).subscribe(
      res => {
        console.log(res);
        this.data.route = this.sanitizer.bypassSecurityTrustResourceUrl(res['document'].route);
        //this.sanitizer.sanitize(SecurityContext.URL, this.data.route);
        console.log(this.data);
      },
      err => {
        console.log(err);
      }
    );
  }

}
