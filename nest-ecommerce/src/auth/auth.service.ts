// auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/registerDto';
import { LoginDto } from './dto/loginDto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException();
    }
    console.log(user);
    const payload = { id:user._id, email: user.email, name: user.name, role: user.role, cartid:user.cartid };
    const token = await this.jwtService.sign(payload)
    const response = { token: token, id:user._id, email: user.email, name: user.name, role: user.role, cartid:user.cartid };
    return response
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);
    return user
  }
}
