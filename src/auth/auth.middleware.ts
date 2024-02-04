import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService
  ){}
  use(req: any, res: any, next: () => void) {    
    try{
      this.jwtService.verify(req.headers.authorization, {secret: process.env.JWT_SECRET})
      next()
    }catch(err){
      throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
