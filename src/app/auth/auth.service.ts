import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

interface SignedInResponse{
  authenticated: boolean;
  username: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootUrl = 'https://api.angular-email.com';
  signedIn$ = new BehaviorSubject<boolean | null>(null);
  username!: string;

  constructor(private http: HttpClient) { }

  usernameAvailable(username:string):Observable<any>{
    return this.http
      .post<{ available: boolean }>(`${this.rootUrl}/auth/username`, {
        username: username,
      })
  }

  signUp(credentials: any){
    return this.http.post<any>(`${this.rootUrl}/auth/signup`,credentials)
    .pipe(
      tap(({ username })=>{
        this.signedIn$.next(true);
        this.username = username;
      })
    )
  }

  checkAuth(){
    return this.http.get<SignedInResponse>(`${this.rootUrl}/auth/signedin`)
    .pipe(
      tap(({authenticated, username})=>{
        this.signedIn$.next(authenticated);
        this.username = username;
      })
    )
  }

  signOut(){
    return this.http.post(`${this.rootUrl}/auth/signout`,{})
    .pipe(
      tap(()=>this.signedIn$.next(false))
    )
  }

  signIn(credentials: Partial<{ username: string | null; password: string | null; }>) {
    return this.http.post<SignedInResponse>(`${this.rootUrl}/auth/signin`, credentials)
    .pipe(tap(({ username })=>{
      this.signedIn$.next(true);
      this.username = username;
    }))
  }

}
