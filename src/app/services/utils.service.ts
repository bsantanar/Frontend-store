import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  

  typesQuestions:any[] = [
    {
      type: 'Text',
      typeId: 1
    },
    {
      type: 'Paragraph',
      typeId: 2
    },
    {
      type: 'Multiple Choice',
      typeId: 3
    },
    {
      type: 'Checkbox',
      typeId: 4
    },
    {
      type: 'List',
      typeId: 5
    },
    {
      type: 'Scale',
      typeId: 6
    },
    {
      type: 'Rating',
      typeId: 7
    },
    {
      type: 'Date',
      typeId: 8
    },
    {
      type: 'Time',
      typeId: 9
    }];

  constructor() { }

  getTypesQuestion(){
    return this.typesQuestions;
  }

}
