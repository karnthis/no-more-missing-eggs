import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import {HttpErrors} from './decorator/errors.decorator';
import {ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {User} from './user/entities/user.entity';

@Controller()
@HttpErrors()
@ApiTags('General')
export class AppController {
  constructor(
    private readonly appService: AppService,
    ) {}

  @Get()
  @ApiOkResponse({ type: String })
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiOkResponse({ type: User })
  getProfile(@Request() req): User {
    return req.user;
  }
}
