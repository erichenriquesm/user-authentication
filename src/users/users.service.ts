import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { Auth } from 'src/facades/auth.facade';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly userEntity: Repository<User>,
    private jwtService: JwtService,
    private readonly auth: Auth
  ){}

  async create(createUserDto: CreateUserDto) {
    const query = await this.userEntity.findOne({
      where: {
        email: createUserDto.email
      }
    });

    if(query){
      throw new HttpException('email already in use', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 15);
    const user = await this.userEntity.save(createUserDto);
    delete user.password;

    return await this.respondWithToken({... user});
  }

  async login(loginDto: LoginDto){
    const user = await this.userEntity.findOne({
      where: {
        email: loginDto.email
      }
    });

    if(!user){
      throw new HttpException('account doesn\'t exists', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    if(!await bcrypt.compare(loginDto.password, user.password)){
      throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
    }

    delete user.password;

    return await this.respondWithToken({... user});
  }

  async me() {
    return await this.auth.user();
  }

  async update(updateUserDto: UpdateUserDto) {
    const user = await this.auth.user()
    if(updateUserDto.password){
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 15);
    }
    await this.userEntity.update(user.id, updateUserDto);
    return {
      message: 'user updated',
      user: {...user, ...updateUserDto}
    }
  }

  async remove() {
    const user = await this.auth.user();
    await this.userEntity.remove(user);
    return {message: 'user deleted'}
  }

  async respondWithToken(user:Partial<User>) {
    return {
      auth: await this.jwtService.signAsync(user),
      expires_in: process.env.EXPIRES_IN || '2h'
    };
  }
}
