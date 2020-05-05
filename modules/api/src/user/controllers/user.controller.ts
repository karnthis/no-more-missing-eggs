import { Controller, UseGuards, Get, Param } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {UserService} from '../../user/services/user.service';

@Controller('user')
export class UserController {
  constructor(
      private readonly userService: UserService,
  ) {}

  // TODO do we need this?
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return 'hello from user';
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') username: string) {
    return await this.userService.findOne(username);
  }

}
