import {Component, OnInit} from '@angular/core';
import {UserService} from './utils/user/user.service';
import {AuthService} from './utils/auth/services/auth.service';
import {filter, switchMap, take, tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private user: UserService,
    private auth: AuthService,
  ) {
  }
  ngOnInit() {
    this.auth.parsedToken$
      .pipe(
        take(1),
        filter(u => !!u),
        switchMap(u => this.user.get(u.sub.id))
      )
      .subscribe(u => this.auth.user.next(u));
  }
}
