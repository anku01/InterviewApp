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
    this.getQuestion();
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

  getQuestion() {
    let candidateID = JSON.parse(sessionStorage.getItem("candidateData"))._id;
    this.http.post('http://localhost:4000/quizRoute/getExamQuestions', { size: this.noOfQuizs, candidateID: candidateID }).subscribe((resp: any) => {
      if (resp && resp.quizs) {
        resp.quizs.forEach(q => {
          q.answer = "";
          q.options = this.convertOtionsToJson(q.options);
        });
        this.questions.push(resp.quizs[0]);
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
    option = JSON.parse(option);
    option.userAnswer = "";
    return option;
  }

  getAnswer(q, questionNo, optionNo) {
    function findQuestions(qz) {
      return qz._id === q._id;
    }
    questionNo = this.questions.findIndex(findQuestions);
    this.questions[questionNo].answer = optionNo;
    sessionStorage.setItem("exam", JSON.stringify(this.questions));
  }

  getNextQuestion(){

  }
  getPrevQuestion(){

  }

}
