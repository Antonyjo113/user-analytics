import { Module } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'default-secret-key',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [JwtAuthService],
  exports: [JwtAuthService],
})
export class JwtAuthModule {}
