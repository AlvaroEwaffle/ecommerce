import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { APP_FILTER } from '@nestjs/core';
import { ErrorMiddleware } from './utils/error.middleware';
import { CartsModule } from './carts/carts.module';
import { TicketModule } from './tickets/tickets.module';
import { WinstonModule } from 'nest-winston';
import { winstonDevConfig } from './utils/winston.dev.config';
import { winstonProdConfig } from './utils/winston.prod.config';
import { LoggingMiddleware } from './utils/logging.middleware';
import { AppController } from './app.controller';


@Module({
  imports: [
    WinstonModule.forRoot(process.env.NODE_ENV === 'production' ? winstonProdConfig : winstonDevConfig),

    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule,
    UsersModule,
    ProductsModule,
    CartsModule,
    TicketModule,
     ],
  controllers: [AppController],
     providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorMiddleware,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
