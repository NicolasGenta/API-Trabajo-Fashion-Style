import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { UserModule } from 'src/user/user.module';
import { Module } from '@nestjs/common';


@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
    
    UserModule, 
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService, ],
})
export class AuthModule {}
