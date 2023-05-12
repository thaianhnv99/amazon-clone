import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { UserDetail } from './user-detail.interface';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  _getUserDetail(user: UserDocument): UserDetail {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  async findUser(): Promise<UserDetail[]> {
    return (await this.userModel.find()).map((item) =>
      this._getUserDetail(item),
    );
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async findById(id: string): Promise<UserDetail | null> {
    try {
      const user = await this.userModel.findById(id);

      if (!user) return null;
      return this._getUserDetail(user);
    } catch (error) {
      if (error instanceof Error) {
        throw new HttpException('Not found user by id', HttpStatus.FOUND);
      }
    }
  }

  async create(
    name: string,
    email: string,
    hashedPassword: string,
  ): Promise<UserDocument> {
    try {
      const newUser = new this.userModel({
        name,
        email,
        password: hashedPassword,
      });

      return newUser.save();
    } catch (error) {}
  }
}
