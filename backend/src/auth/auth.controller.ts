/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Post('register')
  registerUser(@Body() userRegister: RegisterAuthDto) {
    return this.authService.register(userRegister);
  }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  loginUser(@Body() userLogin: LoginAuthDto) {
    return this.authService.login(userLogin);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req){
    return req.user;
  }
}
