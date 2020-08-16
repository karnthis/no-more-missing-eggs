export interface IKitchenDto {
  ownerId: number;
  kitchenName: string;
}

export interface IKitchen extends IKitchenDto {
  id: number;
  membership: any[];
  category: any[];
}

