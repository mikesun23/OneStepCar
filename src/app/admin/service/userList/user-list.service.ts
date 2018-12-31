import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(private db: AngularFireDatabase) { }

  // not sure about this for now. 
  createSingleUser() {

  }

  getAllUser() {
    return this.db.list('/users/').snapshotChanges();
  }

  getSingleUser(uid: string) {
    return this.db.object('/users/' + uid).valueChanges();
  }

  updateSingleUser(updates: {}, uid: string) {
    this.db.object('/users/' + uid).update(updates);
  }

  deleteSingleUser(uid: string) {
    this.db.object('/users/' + uid).remove();
  }

}
