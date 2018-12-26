import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../service/common.service';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormGroup, Validators, FormArray, FormsModule} from '@angular/forms';
@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {
  questionFormData:any = {
    options: [{0: "0", value: "", isCorrect: false},{1: "1", value: "", isCorrect: false}],
    q_type: "",
    question: {
      text: "",
      code: "",
      hasCode: true
    },
    selected_sev: "",
    selected_tech: "",
  };
  id: string;
  counter:any = 4;
  resp:any = {options: ''};
  editorOption = {
    language: 'javascript', 
    lineNumbers:'off', 
    automaticLayout: true,
    scrollBeyondLastLine: false, 
    minimap: {
      enabled: 'false'
    },
    autoIndent: 'true'
  };

  
  constructor(private router: Router, 
    private commonService: CommonService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute) {}
   submitted:boolean;
   selected_sev:boolean;
   selected_tech:boolean
 
  goto_question_list() {
    this.router.navigate(['./question-list']);
  }
  
  onSubmit(){
    if(this.id){
      // if(this.quizform.valid){
        this.questionFormData.id = this.id;
        // this.questionFormData.options = JSON.stringify(this.questionFormData.options);
        let questionFormData = JSON.parse(JSON.stringify(this.questionFormData));
        this.http.put('http://localhost:4000/questionRoute/question', questionFormData ).subscribe(data => {
          if(data){
            this.router.navigate(['./question-list']);
          }  
          else{
            alert("data is invalid");
          }
        });
        
          // }
    } else{
      // if(this.quizform.valid){
        // this.questionFormData.options = JSON.stringify(this.questionFormData.options);
        console.log(this.questionFormData, "questionFormDataquestionFormDataquestionFormData");
        let questionFormData = JSON.parse(JSON.stringify(this.questionFormData));

        this.http.post('http://localhost:4000/questionRoute/questions', questionFormData ).subscribe(data => {
          if(data){
            this.router.navigate(['./question-list']);
          }  
          else{
            alert("data is invalid");
          }
        });
        
          // }
    }
    this.submitted=true;
    this.selected_sev=true;
    this.selected_tech=true;
    
    }

    addInputField(){
      this.questionFormData.options.push({[this.counter]: this.counter, "value": "" });
      this.counter = this.counter + 1;
    }
    removeInputField(){
      this.counter = this.counter - 1;
      this.questionFormData.options.pop();
    }

  
ngOnInit() {

  if(this.activatedRoute.snapshot.params.id){
    this.id = this.activatedRoute.snapshot.params.id;
    this.http.post('http://localhost:4000/questionRoute/question', {id: this.id} ).subscribe((resp:any) => {
      this.questionFormData = resp;
      this.questionFormData.options = JSON.parse(resp.options);
      // if(this.questionFormData.options)
        // this.questionFormData.options = JSON.parse(this.questionFormData.options);
    });
  }
  }
  

}
