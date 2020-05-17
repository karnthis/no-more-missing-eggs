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
  username: string;
  id: number;
}
