import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//services
import { TokenInterceptorService } from './services/token-interceptor.service';

//npm packages
import { MatStepperModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatSelectModule, MatOptionModule } from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { QuillModule } from 'ngx-quill';

//project components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CreateComponent } from './components/create/create.component';
import { AppRoutingModule } from './app-routing.module';
import { QuickComponent } from './components/quick/quick.component';
import { CustomComponent } from './components/custom/custom.component';
import { TestComponent } from './components/test/test.component';
import { TitleEditComponent } from './components/test/title-edit.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { TemplateComponent } from './components/template/template.component';
import { DocumentComponent } from './components/document/document.component';
import { StudyComponent } from './components/study/study.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NewQuestionComponent } from './components/new-question/new-question.component';

@NgModule({
  entryComponents: [
    TitleEditComponent,
    ConfirmationDialogComponent,
    NewQuestionComponent
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    CreateComponent,
    QuickComponent,
    CustomComponent,
    TestComponent,
    TitleEditComponent,
    ConfirmationDialogComponent,
    TemplateComponent,
    DocumentComponent,
    StudyComponent,
    LoginComponent,
    RegisterComponent,
    NewQuestionComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatStepperModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    MatDialogModule, 
    DragDropModule,
    MatSelectModule, 
    MatOptionModule,
    CodemirrorModule,
    QuillModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
