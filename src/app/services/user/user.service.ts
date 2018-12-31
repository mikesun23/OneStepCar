import { AuthService } from './../authentication/auth/auth.service';
import { GeneralUser } from './../../models/generalUser';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  // updatePostListWithNewPost(userId: string, postId: string) {

  //   let x = this.db.object('/users/' + userId).valueChanges().toPromise();
  //   x.then(res => {
  //     console.log(res);
  //   })

  // }

  create(user: firebase.User) {
    // first time create the user, so only simple entries are needed
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email,
      allowBidding: true,
      biddingCounts: 3
    });
  }

  getUserByUid(uid: string) {
    return this.db.object('/users/' + uid).valueChanges();
  }

  getUser(uid: string): Observable<GeneralUser> {
    return this.db.object('/users/' + uid)
      .valueChanges()
      .pipe(
        map(data => {
          if (data) {
            let user = data as GeneralUser;
            user.$uid = uid;
            return user;
          }
          return null;
        }),
      )
  }

  update(uid: string, generalUser: GeneralUser) {
    //TODO update by using generalUser
    // this.db.object('/users/' + uid).update(generalUser);
    return this.db.object('/users/' + uid).update(generalUser);
  }

  delete(uid: string) {
    this.db.object('/users/' + uid).remove();
  }

  // ********************************** Bidding Section: ***********************************

  createBidding(uid: string, biddingCounts: number, biddingObject) {
    this.db.list('/users/' + uid + '/biddingHistory').push(biddingObject)

    this.db.object('/users/' + uid).update({
      biddingCounts: biddingCounts
    });
  }


}
