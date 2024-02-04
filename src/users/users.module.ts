import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { Auth } from 'src/facades/auth.facade';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.EXPIRES_IN },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, Auth],
})
export class UsersModule {}
