import {Component, OnInit} from '@angular/core';
import {KitchenService} from '../../utils/kitchen/kitchen.service';
import {ActivatedRoute} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {IKitchen} from '../../utils/kitchen/kitchen.model';

@Component({
  selector: 'app-detail-kitchen',
  templateUrl: './detail-kitchen.component.html',
  styleUrls: ['./detail-kitchen.component.scss']
})
export class DetailKitchenComponent implements OnInit {

  kitchen$: Observable<IKitchen>;

  constructor(
    private kitchenSrv: KitchenService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.kitchen$ = this.route.paramMap
      .pipe(
        map(p => Number(p.get('id'))),
        switchMap(kId => this.kitchenSrv.get(kId))
      );

  }

}
