/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(userRegister: RegisterAuthDto): Promise<User> {
    const { password } = userRegister;
    const hashPassword = await hash(password, 10);
    userRegister = { ...userRegister, password: hashPassword };
    return this.prisma.user.create({ data: userRegister });
  }

  async login(userLogin: LoginAuthDto): Promise<{ token: string }> {
    const { email, password } = userLogin;
    const findUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!findUser) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    const checkPassword = await compare(password, findUser.password);
    if (!checkPassword) {
      throw new HttpException('PASSWORD_INCORRECT', HttpStatus.FORBIDDEN);
    }

    const payload = { id: findUser.id, name: findUser.name };
    const token = await this.jwtService.signAsync(payload);

    return { token }; 
  }

  async getCurrentUser(userId: number): Promise<{ userId: number; name: string }> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, name: true },
    });

    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return { userId: user.id, name: user.name };
  }
}