import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // all other relative components should subscribe this user$ observable.
  // other components can have Input variable for data model passed from upper component
  // and also output variable if it needs to update/write to the variable.

  // passed by input variable can't be as observable, so it can't be updated. 
  // for only-display component its enough, other component needs to update variable, needs to output variable.
  user$: Observable<firebase.User>;

  constructor(
    private route: ActivatedRoute,
    private afAuth: AngularFireAuth,
    private router: Router) {
    this.user$ = afAuth.authState; // !!!** Here is the first user object got returned by afAuth.
    // so the user$ type is Observable<firebase.User>
    // from here, the second place is the app.component.ts got user$ updated,
    // third place, app.component called save(user) from user.service.

    

  }

  // after login user$ will be assigned.
  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
    this.afAuth.auth.signOut();

  }




}
