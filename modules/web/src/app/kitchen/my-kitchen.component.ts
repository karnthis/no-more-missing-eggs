import {Component, OnInit} from '@angular/core';
import {KitchenService} from '../utils/kitchen/kitchen.service';

@Component({
  selector: 'app-my-kitchen',
  templateUrl: './my-kitchen.component.html',
  styleUrls: ['./my-kitchen.component.scss']
})
export class MyKitchenComponent implements OnInit {

  k$ = this.kitchenSrv.getMine();

  constructor(
    private kitchenSrv: KitchenService
  ) {
  }

  ngOnInit(): void {
  }

}
