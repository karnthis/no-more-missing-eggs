import { Controller, UseGuards, Request, Get, Post, Put, Param, Body, Delete } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import {CreateUserDto} from '../../dto/user/create-user.dto';
import {CleanUserDto} from '../../dto/user/clean-user.dto';
import {LoginResponseDto} from '../../dto/auth/login-response.dto';

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
  async login(@Request() req): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }

  @Post('signup')
  signMeUp(@Body() body: CreateUserDto): Promise<CleanUserDto> {
    return this.authService.signup(body);
  }
}
