import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {
  questions: any;
  question: {};
  resultData:any = [];
  editorOption = {
    language: 'javascript', 
    readOnly: 'true', 
    lineNumbers:'off', 
    automaticLayout: true,
    scrollBeyondLastLine: false, 
    minimap: {
      enabled: 'false'
    }
  };
 
  constructor(private router: Router, private commonService: CommonService, private http: HttpClient) {

  }
  goto_home() {
    this.router.navigate(['./home']);
  }
  goto_add_question() {
    this.router.navigate(['./create-question']);
  }
  goToExamDetail(candidateId){
    this.router.navigate(['./exam-details', candidateId]);
  }
  get_questions() {
    this.http.get('http://localhost:4000/questionRoute/questions').subscribe(data => {
      this.questions = data;
    });
  }

  get_results() {
    this.http.get('http://localhost:4000/exam/results').subscribe((data:any) => {
      this.resultData = data;
    });
  }

  edit_question(id) {
    this.router.navigate(['./edit', id]);
  }
  save_data(id){
    this.http.put('http://localhost:4000/questionRoute/questions', id).subscribe(data => {
        console.log(data);
      });
  }
  remove_item(q) {
    this.http.delete('http://localhost:4000/questionRoute/question', {params:{questionId: q._id}}).subscribe(data => {
      this.questions.splice(this.questions.indexOf(q), 1);
    });
  }

  
  ngOnInit() {
    this.get_questions();
    this.get_results();
  }

}
