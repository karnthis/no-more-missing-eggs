import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ItemService} from '../../../../utils/item/item.service';
import {INewItem} from '../../../../utils/item/item.model';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss']
})
export class NewItemComponent implements OnInit {

  newItemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private itemSrv: ItemService,
  ) {
  }

  get categories() {
    return this.newItemForm.get('usedCategories') as FormArray;
  }

  ngOnInit(): void {
    this.newItemForm = this.fb.group({
      name: ['', [Validators.required]],
      barcode: [1234, []],
      count: [1, [Validators.required]],
      expiration: [Date.now() + 604800, [Validators.required]],
      added: [1594581815263 /* Date.now()*/, []],
      isDelete: [false],
      usedCategories: this.fb.array([this.newCategory()])
    });
  }

  addCategory() {
    this.categories.push(this.newCategory());
  }

  newCategory() {
    return this.fb.control(1, [Validators.required]);
  }

  save() {
    const payload: INewItem = {
      usedCategories: [1], // this.newItemForm.get('usedCategories').value,
      item: {
        added: 1594581815263,
        barcode: 1234,
        count: 1,
        isDelete: false,
        name: 'test',
        expiration: 1594581815263 // Date.now() // new Date(this.newItemForm.get('expiration').value).valueOf()
      }
    };

    this.itemSrv.create(payload)
      .subscribe(
        r => console.log(r)
      );
  }
}
