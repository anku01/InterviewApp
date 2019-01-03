import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormGroup, Validators, FormArray} from '@angular/forms';

@Injectable()
export class CommonService {

  baseURL:string = "http://localhost:4000/";
  constructor(private router: Router, private http: HttpClient) { }

  submitCandidateSignUpRequest(signUpData){
    return this.http.post<any>(this.baseURL +"userRoute/candidateLogin",signUpData);
  }
  submitAdminSignUpRequest(signUpData){
    return this.http.post(this.baseURL +"userRoute/adminLogin",signUpData);
  }
  updateQuestion(questionFormData){
    return this.http.put(this.baseURL +"questionRoute/question",questionFormData);
  }
  addQuestion(questionFormData){
    return this.http.post(this.baseURL +"questionRoute/questions",questionFormData);
  }
  deleteQuestionById(questionData){
    return this.http.delete(this.baseURL +"questionRoute/question",questionData);
  }
  getQuestionById(id){
    return this.http.post(this.baseURL +"questionRoute/question",id);
  }
  getAllQuestions(){
    return this.http.get(this.baseURL +"questionRoute/questions");
  }
  getExamDetailsById(id){
    return this.http.post(this.baseURL +"exam/details",id);
  }
  getExamResults(){
    return this.http.get(this.baseURL +"exam/results");
  }
  deleteExamDetails(examId){
    return this.http.post(this.baseURL +"exam/delete", examId);
  }
  submitExam(examData){
    return this.http.post(this.baseURL +"quizRoute/submitExam", examData);
  }
  startExam(examConfig){
    return this.http.post(this.baseURL +"quizRoute/startExam", examConfig);
  }
  getNextQuestion(examConfig){
    return this.http.post(this.baseURL +"quizRoute/getNextQuestion", examConfig);
  }

}
