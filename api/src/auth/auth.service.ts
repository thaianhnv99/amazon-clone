import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDetail } from 'src/user/user-detail.interface';
import { ExitstingUserDTO } from 'src/user/dtos/exitsting-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async register(user: Readonly<NewUserDTO>): Promise<UserDetail | null> {
    try {
      const { name, email, password } = user;
      const exitstingUser = await this.userService.findByEmail(email);

      if (exitstingUser) {
        throw new Error('InvalidEmail');
      }

      const hashedPassword = await this.hashPassword(password);

      const newUser = await this.userService.create(
        name,
        email,
        hashedPassword,
      );

      newUser.save();
      return this.userService._getUserDetail(newUser);
    } catch (error) {
      //   if (error instanceof PrismaClientKnownRequestError) {
      //     if (error.code === 'P2002') {
      //       throw new ForbiddenException('Credentials taken');
      //     }
      //   } else
      if (error instanceof Error) {
        throw new HttpException('Exits email', HttpStatus.CREATED);
      }
    }
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetail | null> {
    const exitstingUser = await this.userService.findByEmail(email);

    // if user does not exits throw exception
    if (!exitstingUser) {
      throw new ForbiddenException('Credentials incorrect');
    }

    // Compare password
    const pwMatches = await this.doesPasswordMath(
      password,
      exitstingUser.password,
    );
    // if password incorrect throw exception
    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    return this.userService._getUserDetail(exitstingUser);
  }

  async login(exitUser: ExitstingUserDTO): Promise<{ access_token: string }> {
    const user = await this.validateUser(exitUser.email, exitUser.password);

    const token = await this.jwtService.signAsync({
      user,
    });
    return { access_token: token };
  }

  async doesPasswordMath(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
