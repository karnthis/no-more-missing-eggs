import {IKitchenDto} from '../../kitchen/kitchen.model';

export interface ISignUp {
  firstName: string;
  lastName: string;
  username: string;
  emailAddress: string;
  status: string;
  password: string;
  confirmPassword: string;
}

export interface ISignUpResponse {
  firstName: string;
  lastName: string;
  username: string;
  emailAddress: string;
  status: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  kitchenIds: IKitchenDto[];
  userInfo: {
    emailAddress: string;
    firstName: string;
    id: number;
    lastName: string;
    status: string;
    username: string;
  };
}
