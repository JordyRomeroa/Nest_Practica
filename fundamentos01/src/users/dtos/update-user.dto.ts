import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(150)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}