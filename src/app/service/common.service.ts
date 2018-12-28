import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormGroup, Validators, FormArray} from '@angular/forms';

@Injectable()
export class CommonService {

  constructor(private router: Router, private http: HttpClient) { }


}
