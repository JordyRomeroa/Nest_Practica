import { IsString, IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  name: string;

  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsEmail({}, { message: 'Debe ingresar un email válido' })
  @MaxLength(150)
  email: string;

  @IsNotEmpty({ message: 'La contraseña es obligatoria' })
  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;
}