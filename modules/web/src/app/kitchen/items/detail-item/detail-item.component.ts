import {Component, Input, OnInit} from '@angular/core';
import {IItem} from '../../../utils/item/item.model';
import {ItemService} from '../../../utils/item/item.service';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.scss']
})
export class DetailItemComponent implements OnInit {

  @Input()
  item: IItem;

  constructor(
    private itemSrv: ItemService
  ) { }

  ngOnInit(): void {
  }

  remove(item: IItem): void {
    // this.itemSrv.delete();
  }

}
