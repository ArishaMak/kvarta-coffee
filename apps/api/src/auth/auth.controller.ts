import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: { email: string; pass: string }) {
    return this.authService.login(dto.email, dto.pass);
  }

  @Post('register')
  register(@Body() dto: { email: string; pass: string }) {
    return this.authService.register(dto.email, dto.pass);
  }
}
