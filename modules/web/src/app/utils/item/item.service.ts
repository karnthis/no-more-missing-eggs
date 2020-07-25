import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IItem, INewItem} from './item.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(
    private http: HttpClient
  ) {
  }

  create(item: INewItem): Observable<any> {
    return this.http.post<any>(`/api/item`, item);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`/api/item/${id}`);
  }

  update(item: IItem, id: number): Observable<any> {
    return this.http.put(`/api/item/${id}`, item);
  }
}
