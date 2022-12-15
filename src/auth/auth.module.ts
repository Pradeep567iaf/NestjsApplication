import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController],
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret : jwtConstants.secret,
      signOptions : {
        expiresIn : '1d'
      },
    })
    
  
  
  ],
  exports: [AuthService]
})
export class AuthModule {}
