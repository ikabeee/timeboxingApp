/* eslint-disable prettier/prettier */
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { AuthGuard } from './auth.guard';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async registerUser(@Body() userRegister: RegisterAuthDto): Promise<User> {
    return this.authService.register(userRegister);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async loginUser(@Body() userLogin: LoginAuthDto): Promise<{ token: string }> {
    const { token } = await this.authService.login(userLogin);
    return { token };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user; // Devuelve la información del usuario autenticado
  }

  @UseGuards(AuthGuard)
  @Get('currentUser')
  async getCurrentUser(@Request() req) {
    return this.authService.getCurrentUser(req.user.id); // Obtiene el usuario actual
  }
}