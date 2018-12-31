import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  private basePath = '/uploads';

  constructor(private db: AngularFireDatabase) { }

  
  pushImageListToStorage(imageList) {
    const storageRef = firebase.storage().ref();

    // upload imageList
    const uploadTask = storageRef.child(this.basePath + '/test-posting').put(imageList);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot

      },
      (error) => {
        // fail
        console.log(error);
      },
      () => {
        // success
        let url = uploadTask.snapshot.downloadURL; // imageList download URL
        this.saveData(imageList);
      })
  }

  private saveData(imageList) {
    this.db.list(this.basePath + '/').push(imageList);
  }

}
