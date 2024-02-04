import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

export class Auth {
    constructor(
        @Inject('REQUEST') private readonly req: Request,
        private jwtService: JwtService
    ){}

    async user(){
        const user = await this.jwtService.decode(this.req.headers.authorization);
        if(!user){
            throw new HttpException('unauthorized', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}