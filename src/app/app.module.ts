import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CandidateComponent } from './candidate/candidate.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { QuizResultComponent } from './thankyouMsg/quiz-result.component';
import { CreateQuestionComponent } from './create-question/create-question.component';
import { CommonService } from './service/common.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StartQuizComponent } from './start-quiz/start-quiz.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BlockCopyPasteDirective } from './directive/block-copy-paste.directive';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ExamDetailsComponent } from './exam-details/exam-details.component';





const appRoutes : Routes = [
  {path : 'home', component : HomeComponent},
   {path : 'candidate', component : CandidateComponent},
   {path : 'admin', component :  AdminComponent},
   {path : 'quiz', component :  QuizComponent},
   {path : 'start-quiz', component :  StartQuizComponent},
   {path : 'quiz-result', component :  QuizResultComponent},
   {path : 'question-list', component :  QuestionListComponent},
   {path : 'create-question', component :  CreateQuestionComponent},
  {path : 'edit/:id', component : CreateQuestionComponent},
  {path : 'exam-details/:examId', component : ExamDetailsComponent},
  {path : '', redirectTo : '/candidate' , pathMatch: 'full'}
]


@NgModule({
  declarations: [
    AppComponent,
    CandidateComponent,
    AdminComponent,
    HomeComponent,
    QuizComponent,
    QuestionListComponent,
    QuizResultComponent,
    CreateQuestionComponent,
    StartQuizComponent,
    BlockCopyPasteDirective,
    ExamDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MonacoEditorModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
