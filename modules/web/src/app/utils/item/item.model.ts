export interface INewItem {
  usedCategories: number[];
  item: IItem;
}


export interface IItem {
  name: string;
  barcode: number;
  count: number;
  expiration: number;
  added: number;
  isDelete: number;
}
