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

  constructor(private router: Router, private commonService: CommonService, private http: HttpClient) { }
  
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
      console.log(this.adminform, "REQ DATA");
      this.http.post('http://localhost:4000/userRoute/adminLogin', this.adminform.value).subscribe(data => {
        console.log(data);
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
