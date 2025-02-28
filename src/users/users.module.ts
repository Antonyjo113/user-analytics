import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtAuthModule } from 'src/jwt-auth/jwt-auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule, JwtAuthModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
