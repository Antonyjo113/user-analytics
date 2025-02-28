// src/dto/create-user-dto.ts

import { IsString, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { Role, UserStatus } from '@prisma/client';

export class UpdateUserDto {

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
