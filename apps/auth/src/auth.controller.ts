import { Controller, Get, Post, UseGuards, Res} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser, UserDocument } from '@app/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { log } from 'console';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

   @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: UserDocument,
    @Res({passthrough: true}) response: Response,) {
    log('User logged in:', user);
    // Set the JWT token in the response cookie
    await this.authService.login(user, response);
    response.send(user);
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any){
    return data.user;
  }
}
