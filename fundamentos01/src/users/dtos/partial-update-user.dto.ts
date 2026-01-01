import { IsString, IsEmail, IsOptional, MinLength, MaxLength } from 'class-validator';

export class PartialUpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  name?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(150)
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;
}