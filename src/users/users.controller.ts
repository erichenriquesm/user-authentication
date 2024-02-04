import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Delete,
  Put
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  @Get('me')
  me() {
    return this.usersService.me();
  }

  @Put()
  update(@Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto);
  }

  @Delete()
  remove() {
    return this.usersService.remove();
  }
}
