import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../models/user.model';
import { PartialUpdateUserDto } from '../dtos/partial-update-user.dto';


import { UpdateUserDTO } from '../dtos/update-user.dto';
import { UserEntity } from 'src/products/entities/user.entity';
import { CreateUserDTO } from '../dtos/create-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAll() {
    const entities = await this.userRepository.find();
    return entities.map(User.fromEntity).map(user => user.toResponseDto());
  }

  async findOne(id: number) {
    const entity = await this.userRepository.findOne({ where: { id } });
    if (!entity) {
     
      throw new NotFoundException(`Usuario no encontrado con ID: ${id}`);
    }
    return User.fromEntity(entity).toResponseDto();
  }

  async create(dto: CreateUserDTO) {
    
    const exists = await this.userRepository.findOne({ where: { email: dto.email } });
    
    if (exists) {
 
      throw new ConflictException(`El email ya está registrado: ${dto.email}`);
    }

    const user = User.fromDto(dto);
    const saved = await this.userRepository.save(user.toEntity());
    return User.fromEntity(saved).toResponseDto();
  }

  async update(id: number, dto: UpdateUserDTO) {
    const entity = await this.userRepository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Usuario no encontrado con ID: ${id}`);
    }

    const updated = User.fromEntity(entity).update(dto).toEntity();
    const saved = await this.userRepository.save(updated);
    return User.fromEntity(saved).toResponseDto();
  }

  async partialUpdate(id: number, dto: PartialUpdateUserDto) {
    const entity = await this.userRepository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Usuario no encontrado con ID: ${id}`);
    }

    const updated = User.fromEntity(entity).partialUpdate(dto).toEntity();
    const saved = await this.userRepository.save(updated);
    return User.fromEntity(saved).toResponseDto();
  }

  async delete(id: number) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Usuario no encontrado con ID: ${id}`);
    }
    return { message: 'Usuario eliminado correctamente' };
  }
}