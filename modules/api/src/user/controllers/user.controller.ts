import {Controller, UseGuards, Get, Param, Put, Body, Delete} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {UserService} from '../../user/services/user.service';
import {User} from '../entities/user.entity';
import {DeleteResultsDto} from '../../dto/misc/delete-results.dto';
import {UpdateUserDto} from '../../dto/user/update-user.dto';

@Controller('user')
export class UserController {
  constructor(
      private readonly userService: UserService,
  ) {}

  // TODO do we need this?
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll(): string {
    return 'hello from user';
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(
    @Param('id') username: string,
  ): Promise<User|undefined> {
    return await this.userService.findOne(username);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateOne(
    @Param('id') id: number,
    @Body() userInfo: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, userInfo);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(
    @Param('id') id: number,
  ): Promise<DeleteResultsDto> {
    return this.userService.deleteUser(id);
  }
}
