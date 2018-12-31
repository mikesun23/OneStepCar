import { StorePostService } from 'src/app/user/my-posting/store-post.service';
import { WaitingListService } from './../../../service/post/waitingList/waiting-list.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-waiting-post-list',
  templateUrl: './waiting-post-list.component.html',
  styleUrls: ['./waiting-post-list.component.css']
})
export class WaitingPostListComponent implements OnInit {

  waitingList: any[] = [];

  constructor(
    private waitingListService: WaitingListService,
    private router: Router,
    private storePostService: StorePostService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.waitingListService.getAllFromWaitingPool().subscribe(res => {
      res.map(p => {
        Object.values(p).forEach(x => {
          this.waitingList.push(x);
        })
      })
      console.log(this.waitingList);
    })
  }

  navToDetailPage(post) {
    console.log(post);
    console.log(this.route);
    this.storePostService.saveCurrentPost(post);
    this.router.navigate(['../detailPage', post['post_id']], {relativeTo: this.route}).then(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

}
