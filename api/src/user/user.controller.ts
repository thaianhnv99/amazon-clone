import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetail } from './user-detail.interface';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  async getAllUser(): Promise<UserDetail[] | null> {
    return this.userService.findUser();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserDetail | null> {
    return this.userService.findById(id);
  }
}
