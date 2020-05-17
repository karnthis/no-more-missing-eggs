import {Component, OnInit} from '@angular/core';
import {AuthService} from '../utils/auth/services/auth.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  me = this.auth.user$;

  constructor(
    private auth: AuthService
  ) {
  }

  ngOnInit(): void {
  }

}
