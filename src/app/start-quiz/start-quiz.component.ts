import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  constructor(private router: Router) { }
  testDuration = 15;
  ngOnInit() {
  }
  goToTest(){
    // sessionStorage.clear();
    sessionStorage.setItem("TestDuration", this.testDuration.toString());
    this.router.navigate(['./quiz']);
  }
}
