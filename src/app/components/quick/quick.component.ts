import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';



@Component({
  selector: 'app-quick',
  templateUrl: './quick.component.html',
  styleUrls: ['./quick.component.css']
})
export class QuickComponent implements OnInit {

  profileFormGroup: FormGroup;
  addressFormGroup: FormGroup;

  constructor(private location: Location, private fb: FormBuilder) { }

  ngOnInit() {
    this.profileFormGroup = this.fb.group({
      name: ['', Validators.required]
    });
    this.addressFormGroup = this.fb.group({
      address:['', Validators.required]
    });
  }

  backClicked() {
    this.location.back();
  }

}
