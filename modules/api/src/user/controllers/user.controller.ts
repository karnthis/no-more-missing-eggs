import {Controller, UseGuards, Get, Param, Put, Body, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import {UserService} from '../../user/services/user.service';
import {User} from '../entities/user.entity';
import {UpdateUserDto} from '../../dto/user/inbound/update-user.dto';
import {HttpErrors} from '../../decorator/errors.decorator';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';

@Controller('user')
@HttpErrors()
@ApiTags('User')
export class UserController {
  constructor(
      private readonly userService: UserService,
  ) {}

  // TODO do we need this?
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({ type: String })
  getAll(): string {
    return 'hello from user';
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOkResponse({ type: User })
  async getOne(
    @Param('id') id: number,
  ): Promise<User> {
    const user = await this.userService.findOneById(id);
    if (user) {
      return user;
    } else {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'No User Found',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOkResponse({ type: User })
  async updateOne(
    @Param('id') id: number,
    @Body() userInfo: UpdateUserDto,
  ): Promise<User> {
    const user = await this.userService.updateUser(id, userInfo);
    if (user) {
      return user;
    } else {
      throw new HttpException({
        statusCode: HttpStatus.NOT_FOUND,
        error: 'No User Found to Update',
      }, HttpStatus.NOT_FOUND);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOkResponse({ type: User })
  deleteOne(
    @Param('id') id: number,
  ): Promise<User> {
    return this.userService.deleteUser(id);
  }
}
