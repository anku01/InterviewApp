import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  minutes: number = 0;
  seconds: number = 0;
  countDownDate: number = 0;
  noOfQuizs: number = parseInt(sessionStorage.getItem("TestDuration")) || 15;
  questions: any = [];
  activeQuestion:any = [];
  activeQuestionNumber: number = 1;


  goto_quiz() {
    // this.router.navigate(['./quiz']);

  }
  goto_quiz_result() {
    let examData = {
      exam: JSON.parse(sessionStorage.getItem("exam")),
      candidateData: JSON.parse(sessionStorage.getItem("candidateData"))
    };
    this.http.post('http://localhost:4000/quizRoute/submitExam', examData).subscribe((resp: any) => {

    })
    this.router.navigate(['./quiz-result']);
  }
  ngOnInit() {
    this.startExam();
    // Update the count down every 1 second
    var interval = setInterval(() => {

      // Get todays date and time
      let now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = this.countDownDate - now;

      // Time calculations for minutes and seconds
      // var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // If the count down is finished, write some text 
      if (distance < 0) {
        clearInterval(interval);
        alert("Time over");
      }
    }, 1000);
  }

  startExam() {
    let candidateID = JSON.parse(sessionStorage.getItem("candidateData"))._id;
    this.http.post('http://localhost:4000/quizRoute/startExam', {size: this.noOfQuizs, candidateID: candidateID} ).subscribe((resp:any) => {
      if(resp && resp.quizs){
        resp.quizs.forEach(q => {
          q.answer = "";
          q.options = this.convertOtionsToJson(q.options);
        });
        this.questions.push(resp.quizs[0]);
        this.activeQuestion = resp.quizs;
      }

      if (this.noOfQuizs === 15)
        this.countDownDate = (new Date().getTime()) + (1000 * 60 * 30)
      if (this.noOfQuizs === 25)
        this.countDownDate = (new Date().getTime()) + (1000 * 60 * 45)
      if (this.noOfQuizs === 30)
        this.countDownDate = (new Date().getTime()) + (1000 * 60 * 60)
    });
  }


  convertOtionsToJson(option) {
    option = option.replace(/'/g, '"');
    option = option.replace(/([^"]+)|("[^"]+")/g, function ($0, $1, $2) {
      if ($1) {
        return $1.replace(/([a-zA-Z0-9]+?):/g, '"$1":');
      } else {
        return $2;
      }
    });
    return JSON.parse(option);
  }

  getAnswer(q, questionNo, optionNo) {
    function findQuestions(qz) {
      return qz._id === q._id;
    }
    questionNo = this.questions.findIndex(findQuestions);
    this.questions[questionNo].answer = optionNo;
    this.activeQuestion[0].answer = optionNo;
    sessionStorage.setItem("exam", JSON.stringify(this.questions));
  }

  getNextQuestion(){
    
    
      console.log(this.questions.length, "questionsquestionsquestions");
      // this.activeQuestionNumber = this.activeQuestionNumber + 1;
      // this.activeQuestion = [this.questions[this.activeQuestionNumber-1]];
      var questionId: any = "";
      if(this.questions[this.activeQuestionNumber] && this.questions[this.activeQuestionNumber]._id ){
        questionId = this.questions[this.activeQuestionNumber ]._id;
      }
      this.activeQuestion[0].answer =  this.questions[this.activeQuestionNumber-1]['answer'];
      console.log('next button clicked', this.activeQuestion);

      let candidateID = JSON.parse(sessionStorage.getItem("candidateData"))._id;
      this.http.post('http://localhost:4000/quizRoute/getNextQuestion', {
        candidateID: candidateID,
        stats: { 
          question: this.activeQuestion
          },
          noOfQuizs: this.noOfQuizs,
          questionId: questionId || ""
        }).subscribe((resp:any) => {
        if(resp && resp.quizs){
          resp.quizs.forEach(q => {
            console.log(q,"optionsoptionsoptionsoptions");
            q.answer = "";
            q.options = this.convertOtionsToJson(JSON.stringify(q.options));
          });
          this.questions.push(resp.quizs[0]);
          this.activeQuestion = resp.quizs;
          this.activeQuestionNumber = this.activeQuestionNumber + 1;
        }
      });
  }
  getPrevQuestion(){

    this.activeQuestion[0].answer =  this.questions[this.activeQuestionNumber-1]['answer'];
      console.log('next button clicked', this.activeQuestion);

      let candidateID = JSON.parse(sessionStorage.getItem("candidateData"))._id;
      this.http.post('http://localhost:4000/quizRoute/getNextQuestion', {
        candidateID: candidateID,
        stats: { 
          question: this.activeQuestion,
          },
        questionId: this.questions[this.activeQuestionNumber -2]._id,
        noOfQuizs: this.noOfQuizs
        }).subscribe((resp:any) => {
        if(resp && resp.quizs){
          resp.quizs.forEach(q => {
            console.log(q,"getPrevQuestiongetPrevQuestion");
            q.answer = "";
            q.options = this.convertOtionsToJson(JSON.stringify(q.options));
          });
          this.questions.push(resp.quizs[0]);
          this.activeQuestion = resp.quizs;
          this.activeQuestionNumber = this.activeQuestionNumber - 1;
        }
      });


    this.activeQuestionNumber = this.activeQuestionNumber - 1;
    this.activeQuestion = [this.questions[this.activeQuestionNumber -1]];
  }

}