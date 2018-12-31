import { PostService } from './../../services/post/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css']
})
export class BiddingComponent implements OnInit {

  constructor(private postService: PostService) { }

  ngOnInit() {
  }

}
