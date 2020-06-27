import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ILogin, ILoginResponse, ISignUp, ISignUpResponse} from '../models/auth.model';
import {BehaviorSubject, EMPTY, Observable, ReplaySubject} from 'rxjs';
import {IUser} from '../models/user.model';
import {catchError, map, tap} from 'rxjs/operators';
import * as JWT from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new ReplaySubject<IUser>(1);
  user$ = this.user.asObservable();

  private token = new BehaviorSubject<string>(this.getToken());
  token$ = this.token.asObservable()
    .pipe(
      tap(t => localStorage.setItem('token', t))
    );
  parsedToken$: Observable<IParsedToken | undefined> = this.token$.pipe(
    map(t => JWT(t)),
    catchError((e, c) => {
      console.log('No auth token to parse');
      return EMPTY;
    })
  );
  isTokenValid$ = this.token$.pipe(
    map(t => !!t)
  );

  constructor(
    private http: HttpClient
  ) {
  }

  signUp(body: ISignUp): Observable<ISignUpResponse> {
    return this.http.post<any>(`/api/auth/signup`, body);
  }

  login(body: ILogin): Observable<ILoginResponse> {
    return this.http.post<any>(`/api/auth/login`, body)
      .pipe(
        tap(r => this.token.next(r?.access_token))
      );
  }

  logout(): void {
    this.token.next(null);
    localStorage.removeItem('token');
    this.user.next(null);
  }

  private getToken() {
    const token = localStorage.getItem('token');
    if (token?.length > 100) {
      return token;
    }
    return null;
  }
}

interface IParsedToken {
  exp: number;
  iat: number;
  sub: number;
  username: string;
  kitchenIds: number[];
  // sub: {
  //   emailAddress: string;
  //   firstName: string;
  //   id: number;
  //   lastName: string;
  //   status: string;
  //   username: string;
  // };
}
