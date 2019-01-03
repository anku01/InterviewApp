import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';
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
 
  constructor(private router: Router, private commonService: CommonService) {

  }
  goto_home() {
    this.router.navigate(['./home']);
  }
  goto_add_question() {
    this.router.navigate(['./create-question']);
  }
  goToExamDetail(testId){
    this.router.navigate(['./exam-details', testId]);
  }
  get_questions() {
    this.commonService.getAllQuestions().subscribe(data => {
      this.questions = data;
    });
  }

  get_results() {
    this.commonService.getExamResults().subscribe((data:any) => {
      this.resultData = data;
    });
  }

  edit_question(id) {
    this.router.navigate(['./edit', id]);
  }
  // save_data(id){
  //   this.http.put('http://localhost:4000/questionRoute/questions', id).subscribe(data => {
  //       console.log(data);
  //     });
  // }
  remove_item(q) {
    this.commonService.deleteQuestionById({params:{questionId: q._id}}).subscribe(data => {
      this.questions.splice(this.questions.indexOf(q), 1);
    });
  }

  removeExamDetail(aResult){
    this.commonService.deleteExamDetails({examId: aResult._id}).subscribe(data => {
      this.resultData.splice(this.resultData.indexOf(aResult), 1);
    });
  }

  
  ngOnInit() {
    this.get_questions();
    this.get_results();
  }

}
