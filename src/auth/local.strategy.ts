import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/user/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }



  async validate(email: string, password: string) {
    console.log("test")
    const user = await this.authService.validateUser(email, password);
    console.log(user)
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}