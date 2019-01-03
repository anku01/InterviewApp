import { CommonService } from './../service/common.service';
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
              private commonService: CommonService
    ) { }
  id:any = "";
  answerCode: string;
  examDetails:any = {
    candidateData:{
      testData: [],
      totalQuestions: 15
    }
  };
  ngOnInit() {
    if(this.activatedRoute.snapshot.params.examId){
      this.id = this.activatedRoute.snapshot.params.examId;
      this.commonService.getExamDetailsById({testId: this.id}).subscribe((resp:any) => {
        this.examDetails = resp;        
      });
    }
  }

  viewAnswerCode(answerCode){
    this.answerCode = answerCode;
  }
}
