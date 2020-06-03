import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn$ = this.auth.user$
    .pipe(
      map(u => !!u),
    );

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
  }

}
