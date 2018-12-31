import { Router } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { GeneralUser } from 'src/app/models/generalUser';
import { StorePostService } from 'src/app/user/my-posting/store-post.service';


@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {

  @Input('currentUser') currentUser: GeneralUser = new GeneralUser('', '');
  @Input('carPost') carPost: {} = {};
  
  constructor(private router: Router, private storePostService: StorePostService) { }

  ngOnInit() {
    console.log(this.currentUser);
  }

  navToDetailPage(post) {
    this.storePostService.saveCurrentPost(post);
    this.router.navigate(['publicDetailPage', post['postId']]);
  }

}
