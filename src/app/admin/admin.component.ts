import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormGroup, Validators, FormArray} from '@angular/forms';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private commonService: CommonService) { }
  
  submitted:boolean;


  adminform = new FormGroup({
    // $key : new FormControl(null),
    'email': new FormControl('',  [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

    
  formControls = this.adminform.controls;

  signin_admin() {
    this.submitted=true;
    if(this.adminform.valid){
      this.commonService.submitAdminSignUpRequest(this.adminform.value).subscribe(data => {        
        if(data){
          this.router.navigate(['./question-list']);
        }
        else{
          alert("Please enter valid Credentials");
        }
      });
     
    }
  }
  ngOnInit() {
  }
 
}
