import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  showForm: boolean;
  constructor() { }

  ngOnInit() {
    this.showForm = false;
  }


  showPostForm() {
    this.showForm = true;
  }

}
