import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './user.schema';
import { UserDetail } from './user-detail.interface';

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

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async findById(id: string): Promise<UserDetail> {
    const user = await this.userModel.findById(id);

    if (!user) return null;
    return this._getUserDetail(user);
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
