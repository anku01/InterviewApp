import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent implements OnInit {

  constructor(private router: Router) { }
  result:any =  {};
  ngOnInit() {
    this.result = JSON.parse(sessionStorage.getItem("examResult"));
  }

}
