import { Component, OnInit, ViewChild } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-store-assets',
  templateUrl: './store-assets.component.html',
  styleUrls: ['./store-assets.component.css']
})
export class StoreAssetsComponent implements OnInit {

  images = [];
  locales = []; 
  modals = [];
  templates = [];
  filterImages = [];
  filterLocales = [];
  filterModals = [];
  filterTemplates = [];

  @ViewChild('group') group;

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    this.uploadService.getPublicModals().subscribe(
      res => {
        this.modals = res['modals'];
        this.filterModals = this.modals;
      }
    );
    this.uploadService.getPublicImages().subscribe(
      res => {
        this.images = res['images'];
        this.filterImages = this.images;
      }
    );
    this.uploadService.getPublicLocales().subscribe(
      res => {
        this.locales = res['locales'];
        this.filterLocales = this.locales;
      }
    );
    this.uploadService.getPublicTemplates().subscribe(
      res => {
        this.templates = res['templates'];
        this.filterTemplates = this.templates;
      }
    );
  }

  searchAssetStore(name: string){
    switch(this.group.value){
      case 'modals':
        this.filterModalsStore(name.toLowerCase());
        break;
      case 'templates':
        this.filterTemplatesStore(name.toLowerCase());
        break;
      case 'images':
        this.filterImagesStore(name.toLowerCase());
        break;
      case 'locales':
        this.filterLocalesStore(name.toLowerCase());
        break;
      default:
        break;
    }
  }

  filterModalsStore(name: string){
    if(name == ''){
      this.filterModals = this.modals;
      return;
    }
    this.filterModals = this.modals.filter(
      q => q.toLowerCase().includes(name)
    );
  }

  filterTemplatesStore(name: string){
    if(name == ''){
      this.filterTemplates = this.templates;
      return;
    }
    this.filterTemplates = this.templates.filter(
      q => q.toLowerCase().includes(name)
    );
  }

  filterImagesStore(name: string){
    if(name == ''){
      this.filterImages = this.images;
      return;
    }
    this.filterImages = this.images.filter(
      q => q.toLowerCase().includes(name)
    );
  }

  filterLocalesStore(name: string){
    if(name == ''){
      this.filterLocales = this.locales;
      return;
    }
    this.filterLocales = this.locales.filter(
      q => q.toLowerCase().includes(name)
    );
  }

}
