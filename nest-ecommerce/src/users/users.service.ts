import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Cart, CartDocument } from '../carts/entities/cart.entity'; // Adjust the path accordingly


@Injectable()
export class UsersService {
  constructor(
  @InjectModel(User.name) private userModel: Model<UserDocument>,
  @InjectModel(Cart.name) private cartModel: Model<CartDocument>
) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = new this.userModel({ ...createUserDto, password: hashedPassword})
    const cart = new this.cartModel({ userId: user._id.toString() });
    await cart.save();
    user.cartid = cart._id.toString();
    return user.save();
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
    
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
