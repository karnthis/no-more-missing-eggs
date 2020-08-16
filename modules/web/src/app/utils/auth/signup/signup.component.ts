import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NameGeneratorService} from '../../name-geneerator/name-generator.service';
import {ISignUp} from '../models/auth.model';
import {AuthService} from '../services/auth.service';
import {retryWhen} from 'rxjs/operators';
import {genericRetryStrategy} from '../../general/retry-strategy';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private nameSrv: NameGeneratorService,
    private authSrv: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(10)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.genName();
  }

  genName() {
    this.nameSrv.generateName()
      .subscribe(name => {
      this.signUpForm.patchValue({
        username: name.name
      });
    });
  }

  signUp() {
    if (!this.signUpForm.valid) {
      alert('Form invalid. Try Again');
      return;
    }

    const body: ISignUp = {
      firstName: this.signUpForm.get('firstName').value,
      lastName: this.signUpForm.get('lastName').value,
      username: this.signUpForm.get('username').value,
      password: this.signUpForm.get('password').value,
      confirmPassword: this.signUpForm.get('confirmPassword').value,
      emailAddress: this.signUpForm.get('email').value,
      status: 'pending',
    };

    this.authSrv.signUp(body)
  .pipe(
    retryWhen(genericRetryStrategy())
  )
  .subscribe(res => this.router.navigateByUrl('/me'), (err) => console.error(err));

  }

}
