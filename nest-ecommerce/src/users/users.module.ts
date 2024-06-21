import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './entities/user.entity';
import { Cart, CartSchema } from '../carts/entities/cart.entity';

@Module({
imports: [
  MongooseModule.forFeature([
    { name: User.name, schema: UserSchema },
    { name: Cart.name, schema: CartSchema },
  ]),
],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
