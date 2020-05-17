import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {ILogin} from '../models/auth.model';
import {switchMap, tap} from 'rxjs/operators';
import {UserService} from '../../user/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  t = this.authSrv.token$;

  constructor(
    private fb: FormBuilder,
    private authSrv: AuthService,
    private userSrv: UserService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  login() {
    if (!this.loginForm.valid) {
      alert('Invalid form');
      return;
    }

    const body: ILogin = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value,
    };

    this.authSrv.login(body)
      .pipe(
        switchMap(res => {
          return this.userSrv.get(res?.id);
        }),
        tap(user => {
          this.authSrv.user.next(user);
        }),
        switchMap(_ => this.router.navigateByUrl('/me'))
      )
      .subscribe(_ => {}, (e) => console.error(e));
  }

}
