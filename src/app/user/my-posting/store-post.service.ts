import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorePostService {

  currentPost: Observable<any>;

  constructor(private router: Router) { }

  saveCurrentPost(post) {
    this.currentPost = of(post);
  }
}
