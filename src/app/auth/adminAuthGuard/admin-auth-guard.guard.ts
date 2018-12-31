import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from './../../services/authentication/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.user$.pipe(
      // firebase.user mapTo => Observable<boolean>
      map(user => {
        if (user) { // observable<userData> mapTo => Observable<boolean>
          return this.userService.getUserByUid(user.uid).pipe(
            map(u => {
              if (u['isAdmin']) return true;
              this.router.navigate(['/']);
              return false;
            })
          );
        } else { // return Observable<boolean>
          this.router.navigate(['/login']);
          return of(false);
        }
      }),
      // HAVE TO: flatten Observable<Observable<boolean>> => Observable<boolean>
      switchMap(res => {
        return res;
      })
    )


  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // return the same function for child component 
    return this.canActivate(next, state);
  }
}
