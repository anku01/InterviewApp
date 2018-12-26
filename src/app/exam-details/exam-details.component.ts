import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-exam-details',
  templateUrl: './exam-details.component.html',
  styleUrls: ['./exam-details.component.css']
})
export class ExamDetailsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient
    ) { }
  id:any = "";
  examDetails:any = "";
  ngOnInit() {
    if(this.activatedRoute.snapshot.params.examId){
      this.id = this.activatedRoute.snapshot.params.examId;
      this.http.post('http://localhost:4000/exam/details', {testId: this.id} ).subscribe((resp:any) => {
        this.examDetails = resp;
        console.log(this.examDetails)
        
      });
    }
  }
}
