import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IUser} from '../auth/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  get(id: number): Observable<IUser> {
    return this.http.get<IUser>(`/api/user/${id}`);
  }
}
