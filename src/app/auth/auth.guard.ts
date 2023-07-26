import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map, skipWhile, take, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.signedIn$.pipe(
      skipWhile(value => value === null),
      take(1),
      map((isLoggedIn: boolean |null)=>{
        if(isLoggedIn){
          return true;
        }
        else{
          return false;
        }
      }),
      tap((authenticated)=>{
        if(!authenticated){
          this.router.navigateByUrl('/')
        }
      })
    );
  }
}
