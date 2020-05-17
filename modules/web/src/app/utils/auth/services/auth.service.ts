import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ILogin, ILoginResponse, ISignUp, ISignUpResponse} from '../models/auth.model';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {IUser} from '../models/user.model';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new ReplaySubject<IUser>(1);
  user$ = this.user.asObservable();
  private token = new BehaviorSubject<string>(null);
  token$ = this.token.asObservable();

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
}
