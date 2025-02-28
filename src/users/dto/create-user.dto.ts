// src/dto/create-user-dto.ts

import { IsString, IsEmail, MinLength, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { Role, UserStatus } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password should be at least 8 characters long' })
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEnum(Role)
  role: Role;

  @IsEnum(UserStatus)
  status: UserStatus;

  @IsOptional()
  @IsBoolean()
  accountBlocked?: boolean = false;
}
