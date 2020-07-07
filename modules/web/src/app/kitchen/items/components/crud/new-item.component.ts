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

  ngOnInit(): void {
    this.newItemForm = this.fb.group({
      name: ['', [Validators.required]],
      barcode: [1234, []],
      count: [1, [Validators.required]],
      expiration: [Date.now() + 604800000, [Validators.required]],
      added: [1, []],
      isDelete: [0],
      usedCategories: this.fb.array([this.newCategory()])
    });
  }

  addCategory() {
    this.categories.push(this.newCategory());
  }

  newCategory() {
    return this.fb.control(1, [Validators.required]);
  }

  get categories() {
    return this.newItemForm.get('usedCategories') as FormArray;
  }

  save() {
    const payload = {
      usedCategories: this.newItemForm.get('usedCategories').value,
      item: {
        ...this.newItemForm.value,
        expiration: new Date(this.newItemForm.get('expiration').value).valueOf()
      }
    };

    delete payload.item.usedCategories;

    this.itemSrv.create(payload)
      .subscribe(
        r => console.log(r)
      );
  }
}
