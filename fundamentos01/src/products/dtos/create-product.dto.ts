import { IsString, IsNumber, IsNotEmpty, Min, IsOptional, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString()
  @MaxLength(150)
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0, { message: 'El precio no puede ser negativo' })
  price: number;

  @IsOptional()
  @IsNumber()
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock?: number;
}