import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Interview Application';
  constructor(private router: Router) { 

  }
  goto_candidate() {
    this.router.navigate(['./candidate']);
  }
  goto_admin() {
    this.router.navigate(['./admin']);
  }
  ngOnInit() {
   
  }

  

}
