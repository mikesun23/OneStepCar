import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { 
    console.log('dashboard constructor');
  }

  ngOnInit() {
    console.log('dashboard ngoninit');
  }

}
