import {Body, Controller, Get, HttpException, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from '../services/auth.service';
import {LocalAuthGuard} from '../guards/local-auth.guard';
import {JwtAuthGuard} from '../guards/jwt-auth.guard';
import {CreateUserDto} from '../../dto/user/create-user.dto';
import {LoginResponseDto} from '../../dto/auth/login-response.dto';
import {HttpErrors} from '../../decorator/errors.decorator';
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {Kitchen} from '../../kitchen/entities/kitchen.entity';

@Controller('auth')
@HttpErrors()
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOkResponse({ type: String })
  getHello(): string {
    return 'Auth Reached';
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiCreatedResponse({ description: 'The User has successfully logged in.', type: LoginResponseDto})
  async login(
    @Request() req,
  ): Promise<LoginResponseDto> {
    return this.authService.login(req.user);
  }

  @Post('signup')
  @ApiCreatedResponse({ description: 'The User has successfully registered.', type: LoginResponseDto})
  async signMeUp(
    @Body() body: CreateUserDto,
  ): Promise<LoginResponseDto> {
    return await this.authService.signup(body)
      .catch(err => {
        throw new HttpException({
          statusCode: 400,
          error: err,
        }, 400);
      });
  }
}
