import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {KitchenService} from '../../../utils/kitchen/kitchen.service';
import {IKitchenDto} from '../../../utils/kitchen/kitchen.model';
import {AuthService} from '../../../utils/auth/services/auth.service';
import {filter, retryWhen, take} from 'rxjs/operators';
import {genericRetryStrategy} from '../../../utils/general/retry-strategy';
import {Router} from '@angular/router';

@Component({
  selector: 'app-new-kitchen',
  templateUrl: './new-kitchen.component.html',
  styleUrls: ['./new-kitchen.component.scss']
})
export class NewKitchenComponent implements OnInit {

  newKitchen: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private kitSrv: KitchenService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.newKitchen = this.fb.group({
      name: ['', [Validators.required]],
      ownerId: ['', [Validators.required]]
    });

    this.auth.user$
      .pipe(
        filter(u => !!u),
        take(1),
      )
      .subscribe(u => this.newKitchen.patchValue({
        ownerId: u.id
      }));
  }

  save() {
    if (!this.newKitchen.valid) {
      console.log('form invalid');
    }

    const kit: IKitchenDto = {
      ownerId: this.newKitchen.get('ownerId').value,
      kitchenName: this.newKitchen.get('name').value,
    };
    this.kitSrv.create(kit)
      .pipe(
        retryWhen(genericRetryStrategy())
      )
      .subscribe(
        (res) => console.log(res),
        (err) => console.error(err),
      );
  }

}
