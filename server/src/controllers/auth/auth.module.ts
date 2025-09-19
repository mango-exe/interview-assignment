import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from 'src/services/user.service';
import { UserRepository } from 'src/db/repositories/user.repository';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from 'src/services/auth.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    UserRepository,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [UserService, AuthService],
})
export class AuthModule {}
