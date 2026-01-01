
import { PartialUpdateUserDto } from '../dtos/partial-update-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';

import { UpdateUserDTO } from '../dtos/update-user.dto';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UserEntity } from 'src/products/entities/user.entity';

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
    public createdAt: Date,
  ) {
    if (!name || name.trim().length < 3) {
      throw new Error("Nombre inválido: debe tener al menos 3 caracteres");
    }
    if (!email || !email.includes("@")) {
      throw new Error("Email inválido");
    }
    if (!password || password.length < 8) {
      throw new Error("Password inseguro: mínimo 8 caracteres");
    }
  }

  static fromDto(dto: CreateUserDTO): User {
    return new User(0, dto.name, dto.email, dto.password, new Date());
  }

  static fromEntity(entity: UserEntity): User {
    return new User(
      entity.id,
      entity.name,
      entity.email,
      entity.password,
      entity.createdAt,
    );
  }

  toEntity(): UserEntity {
    const entity = new UserEntity();
    if (this.id > 0) entity.id = this.id;
    entity.name = this.name;
    entity.email = this.email;
    entity.password = this.password;
    return entity;
  }

  toResponseDto(): UserResponseDto {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
   
    };
  }

  update(dto: UpdateUserDTO): User {
    this.name = dto.name;
    this.email = dto.email;
    this.password = dto.password;
    return this;
  }

  partialUpdate(dto: PartialUpdateUserDto): User {
    if (dto.name !== undefined) this.name = dto.name;
    if (dto.email !== undefined) this.email = dto.email;
    if (dto.password !== undefined) this.password = dto.password;
    return this;
  }
}