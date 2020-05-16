
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';
import { IPassportUser } from '../../user/interfaces/passportUser.interface';
import { INewUser } from '../../user/interfaces/newUser.interface';

import * as bcrypt from 'bcrypt';
import {CreateUserDto} from '../../dto/user/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneLogin(username);
    if (user && user.password) {
      const match = await bcrypt.compare(pass, user.password);
      if (match) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(passportUser: IPassportUser) {

    const payload = { sub: passportUser };
    return {
      access_token: this.jwtService.sign(payload),
      username: passportUser.username,
      id: passportUser.id,
    };
  }

  async signup(body: CreateUserDto) {
    if (body.password === body.confirmPassword) {
      return bcrypt.hash(body.password, 10)
      .then((hash) => {
        const {confirmPassword, ...bodyToSave} = body;
        bodyToSave.password = hash;
        return this.userService.saveNew(bodyToSave)
        .catch(err => {
          return `error: ${err}`;
        });
      })
      .catch(err => {
        return `error: ${err}`;
      });
    }
    return 'error: Passwords do not match';
  }
}
