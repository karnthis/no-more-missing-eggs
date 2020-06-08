
import {HttpException, Injectable} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../../user/services/user.service';
import {CreateUserDto} from '../../dto/user/create-user.dto';
import {CleanUserDto} from '../../dto/user/clean-user.dto';
import {LoginResponseDto} from '../../dto/auth/login-response.dto';
import {KitchenService} from '../../kitchen/services/kitchen.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private kitchenService: KitchenService,
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

  async login(passportUser: CleanUserDto): Promise<LoginResponseDto> {
    const kitchens = await this.kitchenService.findMyIds(passportUser.id);
    const kitchenIds = kitchens.map(item => item.id);
    const payload = {
      sub: passportUser.id,
      username: passportUser.username,
      kitchenIds,
    };
    return {
      access_token: this.jwtService.sign(payload),
      userInfo: passportUser,
      kitchenIds,
    };
  }

  async signup(body: CreateUserDto): Promise<LoginResponseDto> {
    if (body.password === body.confirmPassword) {
      return bcrypt.hash(body.password, 10)
      .then(async (hash) => {
        const {confirmPassword, ...bodyToSave} = body;
        bodyToSave.password = hash;
        const myNewUser = await this.userService.saveNew(bodyToSave);
        return this.login(myNewUser);
      });
    }
    throw new HttpException({
      statusCode: 400,
      error: 'Passwords Do Not Match',
    }, 400);
  }
}
