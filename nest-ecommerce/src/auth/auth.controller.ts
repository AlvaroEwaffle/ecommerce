import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/loginDto';
import { RegisterDto } from './dto/registerDto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('auth') // Tag for Swagger documentation
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // Endpoint to log in a user
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Login to the application' })
  @ApiBody({ type: LoginDto, description: 'User credentials for login.' })
  @ApiResponse({ status: 200, description: 'Login successful.' })
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

  // Endpoint to register a new user
  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto, description: 'User details for registration.' })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  // Endpoint to log out a user
  @Post('logout')
  @ApiOperation({ summary: 'Logout from the application' })
  @ApiResponse({ status: 200, description: 'Logout successful.' })
  async logout(@Res() res) {
    // Clear the token from the cookie
    res.clearCookie('access_token');
    return res.status(200).json({ message: 'Logout successful' });
  }

  // Endpoint to request a password reset
  @Post('request-password-reset')
  @ApiOperation({ summary: 'Request a password reset' })
  @ApiBody({ type: String, description: 'Email address for password reset.' })
  @ApiResponse({ status: 200, description: 'Password reset requested.' })
  async requestPasswordReset(@Body('email') email: string) {
    return this.authService.requestPasswordReset(email);
  }

  // Endpoint to reset a password using a token
  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password using a token' })
  @ApiBody({ type: String, description: 'Token and new password for password reset.' })
  @ApiResponse({ status: 200, description: 'Password reset successful.' })
  async resetPassword(@Body('token') token: string, @Body('newPassword') newPassword: string) {
    return this.authService.resetPassword(token, newPassword);
  }
}
