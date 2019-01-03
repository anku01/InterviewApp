import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormGroup, Validators, FormArray} from '@angular/forms';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.css']
})
export class CandidateComponent implements OnInit {

 

  constructor(private router: Router, private commonService: CommonService) { }
  
  submitted:boolean;

  

  candidateform =  {
    email: "",
    contact: "",
    candidateIP: "",
    loginDate: ""
  };
  

  signin_candidate() {
    this.submitted=true;
    // login date
    this.candidateform.loginDate = new Date().toString();
    this.candidateform.candidateIP = localStorage.getItem("userIP");
    // if(this.candidateform.valid){
    this.commonService.submitCandidateSignUpRequest(this.candidateform).subscribe(data => {
      if(data){
        console.log(data, "candidateformcandidateform");
        sessionStorage.setItem("candidateData", JSON.stringify(data));
        this.router.navigate(['./start-quiz']);
      }
      else{
        // this.router.navigate(['./quiz']);
      }
    });
   
  // }
}


  ngOnInit() {
  }

}
