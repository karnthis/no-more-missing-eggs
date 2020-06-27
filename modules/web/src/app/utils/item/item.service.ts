import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {INewItem} from './item.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private http: HttpClient
  ) { }


  create(item: INewItem): Observable<any> {
    return this.http.post<any>(`/api/item`, item);
  }
}
