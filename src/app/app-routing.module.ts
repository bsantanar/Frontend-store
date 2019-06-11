import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateComponent } from './components/create/create.component';
import { QuickComponent } from './components/quick/quick.component';
import { CustomComponent } from './components/custom/custom.component';
import { TestComponent } from './components/test/test.component';
import { TemplateComponent } from './components/template/template.component';
import { DocumentComponent } from './components/document/document.component';
import { StudyComponent } from './components/study/study.component';





const routes: Routes = [
  {path: 'home', component: CreateComponent},
  {path: 'quick', component: QuickComponent},
  {path: 'custom', component: CustomComponent},
  {path: 'test', component: TestComponent},
  {path: 'template', component: TemplateComponent},
  {path: 'document', component: DocumentComponent},
  {path: 'study', component: StudyComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }