import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NameGeneratorService {

  constructor(
    private http: HttpClient
  ) {
  }

  generateName(): Observable<Person> {
    return this.getNames()
      .pipe(
        map(({left, right}) => {
          const leftSeed = Math.round(Math.random() * left.length);
          const rightSeed = Math.round(Math.random() * right.length);

          return {
            ...right[rightSeed],
            name: `${left[leftSeed]}_${right[rightSeed].name}`,
          };
        })
      );
  }

  private getNames(): Observable<INamesGenerator> {
    return this.http.get<INamesGenerator>('../../../assets/etc/names.json');
  }
}

interface INamesGenerator {
  left: string[];
  right: Person[];
}

export interface Person {
  desc: string;
  url: string;
  name: string;
}
