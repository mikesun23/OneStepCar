import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WaitingListService {

  constructor(private db: AngularFireDatabase) { }


  // read
  getAllFromWaitingPool() {

    return this.db.list('/generalPosts/waitingPool/').snapshotChanges()
      .pipe(map(data => {
        return data.map(d => {
          return d.payload.val()['posts'];
        })
      }))

  }

  getSingleWaitingPost(uid: string, postId: string) {
    return this.db.object('/generalPosts/waitingPool/' + uid + '/posts/' + postId).valueChanges();
  }




  updateWaitingPost(updates: {}, uid: string, postId: string) {
    this.db.object('/generalPosts/waitingPool/' + uid + '/posts/' + postId).update(updates);
  }

  // delete
  deleteWaitingPost(uid: string, postId: string) {
    this.db.object('/generalPosts/waitingPool/' + uid + '/posts/' + postId).remove();
  }






}
