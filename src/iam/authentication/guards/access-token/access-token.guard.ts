import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import jwtConfig from 'src/iam/config/jwt.config';
import {Request} from 'express'
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {

  constructor(
    private readonly jwtService:JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration:ConfigType<typeof jwtConfig>
  ){

  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest()
    const token = this.getTokenFromHeader(request)
    if(!token){
      throw new UnauthorizedException("请先登录.")
    }
    try {
      const payload = await this.jwtService.verifyAsync(token,this.jwtConfiguration)
      request[REQUEST_USER_KEY] = payload
      console.log(payload);
      
    } catch (error) {
      throw new UnauthorizedException()
    }
    return true
  }

  private getTokenFromHeader(request:Request):string|undefined{
    console.log('authorization:',request.headers.authorization);
    
    const [_,token] = request.headers.authorization?.split(' ') ?? []
    return token
  }
}
