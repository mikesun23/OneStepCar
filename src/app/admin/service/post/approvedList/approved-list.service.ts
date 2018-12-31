import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import { MAT_SELECT_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ApprovedListingService {

  constructor(private db: AngularFireDatabase) { }

  getAllFromApprovedPool() {
    return this.db.list('/generalPosts/approvedPool/').snapshotChanges()
      .pipe(map(data => {
        return data.map(d => {
          return d.payload.val()['posts'];
        })
      }))
  }

  getSingleApprovedPost(uid: string, postId: string) {
    return this.db.object('/generalPosts/approvedPool/' + uid + '/posts/' + postId).valueChanges();
  }


  // approve the post and move it into approved/live listing pool
  // create post in approvedPool( could be put in approvedPool service.ts)
  approveWaitingPost(waitingPost: {}) {

    const storageRef = firebase.database().ref();

    // update posting status
    waitingPost['statusInfo'] = {
      status: "approved",
      approvedTime: new Date().toUTCString()
    }

    const uid: string = waitingPost['user_id'];
    const postId: string = waitingPost['post_id'];
    console.log(uid, postId);
    console.log(uid.length > 0, postId.length > 0);
    // create new post in approved post pool
    if (uid.length > 0 && postId.length > 0) {
      let approvedPost = {};
      approvedPost['/generalPosts/approvedPool/' + uid + '/posts/' + postId] = waitingPost;
      console.log(waitingPost);
      storageRef.child('/generalPosts/approvedPool/' + uid + '/posts/' + postId).update(waitingPost).then(res => {
        console.log(res);
      }, err => {
        console.log(err);
      });

      // append the post under the carMakesData-tree, mainly for filter-box usage
      const carMake: string = waitingPost['carData']['makeYear']['carMakeControl'];
      const carYear: number = waitingPost['carData']['makeYear']['carYearControl'];
      const carModel: string = waitingPost['carData']['basicInfo']['carModelControl'];
      const carTrim: string = waitingPost['carData']['basicInfo']['carTrimControl'];

      storageRef.child('/AllCarMakesData/' + carMake.toLowerCase() + '/' +
        carMake.toLowerCase() + '/' + carModel + '/' + carYear + '/' + carTrim + '/posts')
        .update({[postId]: {user_id: uid}})
    }




  }

  updateApprovedPost(updates: {}, uid: string, postId: string) {
    this.db.object('/generalPosts/approvedPool/' + uid + '/posts/' + postId).update(updates);
  }

  deleteWaitingPost(uid: string, postId: string) {
    this.db.object('/generalPosts/approvedPool/' + uid + '/posts/' + postId).remove();
  }


}
