// auth/auth.controller.ts
import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto';
import { RegisterDto } from './dto/registerDto';
import { LocalAuthGuard } from './guards/local-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res) {
    const response = await this.authService.login(loginDto);
    // Set the token in an HTTP cookie
    res.cookie('access_token', response.token, {
      httpOnly: true, // Ensures the cookie is sent only over HTTP(S), not client JavaScript
      secure: true, // Ensures the cookie is only used over HTTPS
      maxAge: 3600000, // 1 hour
    });

    return res.status(200).json({ response });

  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('logout')
  async logout(@Res() res) {
    // Clear the token from the cookie
    res.clearCookie('access_token');  
    return res.status(200).json({ message: 'Logout successful' });
    
  }
}
