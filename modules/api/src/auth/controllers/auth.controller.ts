import {Controller, UseGuards, Request, Get, Post, Put, Param, Body, Delete, HttpException} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import {CreateUserDto} from '../../dto/user/create-user.dto';
import {CleanUserDto} from '../../dto/user/clean-user.dto';
import {LoginResponseDto} from '../../dto/auth/login-response.dto';
import {ReturningErrorDto} from '../../dto/misc/returning-error.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return 'Auth Reached';
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() req,
  ): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }

  @Post('signup')
  async signMeUp(
    @Body() body: CreateUserDto,
  ): Promise<CleanUserDto> {
    return await this.authService.signup(body)
      .catch(err => {
        throw new HttpException({
          statusCode: 400,
          error: err,
        }, 400);
      });
  }
}
