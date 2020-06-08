import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IKitchen, IKitchenDto} from './kitchen.model';
import {Kitchen} from '../../../../../api/src/kitchen/entities/kitchen.entity';

@Injectable({
  providedIn: 'root'
})
export class KitchenService {

  constructor(
    private http: HttpClient
  ) {
  }

  create(kitchen: IKitchenDto): Observable<IKitchen> {
    return this.http.post<IKitchen>(`/api/kitchen`, kitchen);
  }

  get(id: number): Observable<IKitchen> {
    return this.http.get<IKitchen>(`/api/kitchen/${id}`);
  }

  update(kitchen: { id: number, name: string }): Observable<Kitchen> {
    return this.http.put<IKitchen>(`/api/kitchen/${kitchen.id}`, kitchen);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<any>(`/api/kitchen/${id}`);
  }
}
