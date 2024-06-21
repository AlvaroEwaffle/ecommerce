// auth/auth.service.ts
import { Body, Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/registerDto';
import { LoginDto } from './dto/loginDto';
import * as bcrypt from 'bcryptjs';
import { MailService } from '../utils/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService

  ) { }

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
    const payload = { id: user._id, email: user.email, name: user.name, role: user.role, cartid: user.cartid };
    const token = await this.jwtService.sign(payload)
    const response = { token: token, id: user._id, email: user.email, name: user.name, role: user.role, cartid: user.cartid };
    return response
  }

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);
    return user
  }

  async requestPasswordReset(email: string) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const payload = { email: user.email };
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });

    user.resetToken = token;
    user.resetTokenExpires = new Date(Date.now() + 3600000); // 1 hour from now
    await user.save();

    await this.mailService.sendPasswordResetEmail(user.email, token);

    return { message: 'Password reset email sent' };
  }

  async resetPassword(token: string, newPassword: string) {
    
    if (!token) {
      throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
    }

    try {
      const { email } = this.jwtService.verify(token);
      const user = await this.usersService.findOneByEmail(email);
      if (!user || user.resetToken !== token || user.resetTokenExpires < new Date()) {
        throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
      }
      
      if (await bcrypt.compare(newPassword, user.password)) {
        throw new HttpException('New password cannot be the same as the old password', HttpStatus.BAD_REQUEST);
      }

      user.password = await bcrypt.hash(newPassword, 10);
      user.resetToken = null;
      user.resetTokenExpires = null;

      await user.save();

      return { message: 'Password successfully reset' };
    } catch (error) {
      throw new HttpException('Invalid or expired token', HttpStatus.BAD_REQUEST);
    }
  }
}
