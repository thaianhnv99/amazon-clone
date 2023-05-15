import { Body, Controller, HttpStatus, Post, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDetail } from 'src/user/user-detail.interface';
import { ExitstingUserDTO } from 'src/user/dtos/exitsting-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() user: NewUserDTO): Promise<UserDetail | null> {
    return this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() user: ExitstingUserDTO,
  ): Promise<{ access_token: string }> {
    return this.authService.login(user);
  }

  @Post('verify-jwt')
  async verifyJwt(@Body() payload: { jwt: string }): Promise<{ exp: number }> {
    return this.authService.verifyJwt(payload.jwt);
  }
}
