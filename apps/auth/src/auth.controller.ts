import { Controller, Get, Post, UseGuards, Res} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from 'apps/auth/current-user.decorator';
import { UserDocument } from './models/user.schema';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

   @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@CurrentUser() user: UserDocument,
    @Res({passthrough: true}) response: Response,) {
    await this.authService.login(user, response);
    response.send(user);
  }
}
