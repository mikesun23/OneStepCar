import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { GeneralPost } from '../../models/generalPost';
import { map, switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private db: AngularFireDatabase, private userService: UserService) { }

  private basePath = '/sellingPost'

  async create(postObject, imageList: {}[], historyReportFile: Uint8Array) {
    let userId = postObject['user_id'];
    let imageUrlList: string[] = [];

    let postKey = await firebase.database().ref().child('/generalPosts/waitingPool/' + userId + '/posts').push().key;
    postObject['post_id'] = postKey;

    const storageRef = firebase.storage().ref();

    let index: number = 0;

    let reportFilePath = this.basePath + '/' + userId + '/' + postKey + '/report/';

    for (let i of imageList) {

      let imagePath = this.basePath + '/' + userId + '/' + postKey + '/images/' + i['name'];

      await storageRef.child(imagePath).putString(i['image'], 'data_url').then(async snapshot => {
        // console.log('snapshot: ', snapshot.ref);
        await storageRef.child(imagePath).getDownloadURL().then(async url => {
          imageUrlList.push(url);
          index += 1;
          if (index == (imageList.length)) {
            console.log('shit begins');
            if (historyReportFile !== undefined) {
              console.log('history is not null');
              await storageRef.child(reportFilePath).put(historyReportFile).then(async snapshot => {
                await storageRef.child(reportFilePath).getDownloadURL().then(async url => {
                  let updates = {};
                  postObject['imageUrlList'] = imageUrlList;
                  postObject['reportFileUrl'] = url;
                  updates['/generalPosts/waitingPool/' + userId + '/posts/' + postKey] = postObject;

                  await firebase.database().ref().update(updates).then(async result => {
                    await this.updateUserWithNewPost(userId, postKey);
                  });
                });
              })
            } else {
              console.log('history report is null');
              let updates = {};
              postObject['imageUrlList'] = imageUrlList;
              postObject['reportFileUrl'] = '';
              // make updates key-value pair, {path: data}, ref() points to the root, then add the data with the given path.
              updates['/generalPosts/waitingPool/' + userId + '/posts/' + postKey] = postObject;
              await firebase.database().ref().update(updates).then(async result => {
                await this.updateUserWithNewPost(userId, postKey);
              });
            }
          }
        })
      });
    }
  }

  // add post_id in user in user database
  updateUserWithNewPost(userId: string, postId: string) {
    firebase.database().ref('/users/' + userId + '/postingList').push(postId);
  }

  getPostingListByUserId(userId: string) {
    return this.db.list('/generalPosts/waitingPool/' + userId + '/posts')
      .snapshotChanges()
      .pipe(map(data => {
        return data.map(a => {
          const data = a.payload.val();
          const key = a.payload.key;
          return { key: key, value: data };
        })
      }))
  }


  // TODO: need to refactor the path, post path: generalPosts/waitingPool & generalPosts/approval pool 

  getAllFromWaitingPool() {
    return this.db.list('/generalPosts/waitingPool/').snapshotChanges()
      .pipe(map(data => {
        return data.map(d => {
          return d.payload.val()['posts'];
        })
      }))
  }

  getAllFromApprovedPool() {
    return this.db.list('/generalPosts/approvedPool/').snapshotChanges()
      .pipe(map(data => {
        return data.map(d => {
          return d.payload.val()['posts'];
        })
      }))
  }

  getOneFromWaitingPool(userId: string, postId: string) {
    return this.db.object('/generalPosts/waitingPool/' + userId + '/posts/' + postId).valueChanges();
  }

  getOneFromApprovedPool(userId: string, postId: string) {
    return this.db.object('/generalPosts/approvedPool/' + userId + '/posts/' + postId).valueChanges();
  }

  get(generalPostId: string) {
    return this.db.object('/generalPosts/' + generalPostId);
  }

  update(generalPostId: string, generalPost: GeneralPost) {
    return this.db.object('/generalPosts/' + generalPostId).update(generalPost);
  }

  delete(generalPostId: string) {
    this.db.object('/generalPosts/' + generalPostId).remove();
  }

  getAll() {

    return this.db.list('/generalPosts')
      .snapshotChanges()
      .pipe(map(data => {
        return data.map(a => {
          const data = a.payload.val();
          const key = a.payload.key;
          return { key, data };
        })

      }))

  }

  getPostsWithFullSearchPath(path) {

    return this.db.list('/AllCarMakesData/' + path['carMake'] + '/' + path['carMake'] + '/' +
      path['carModel'] + '/' + path['carYear'] + '/' + path['carTrim'] + '/posts').snapshotChanges()
      .pipe(
        map(data => {
          return data.map(d => {
            const post_id = d.payload.key;
            const user_id = d.payload.val()['user_id'];
            console.log(post_id, user_id);
            return this.getOneFromApprovedPool(user_id, post_id);
          })
        }),
        switchMap(data => {
          console.log(data);
          return data;
        })

      )
  }

}
