import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from '../entities/product.entity';
import { Product } from '../models/product.model';
import { CreateProductDto } from '../dtos/create-product.dto';
import { UpdateProductDto } from '../dtos/update-product.dto';
import { PartialUpdateProductDto } from '../dtos/partial-update-product.dto';
import { NotFoundException } from '../../exceptions/domain/not-found.exception';
import { ConflictException } from '../../exceptions/domain/conflict.exception';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async findAll() {
    const entities = await this.productRepository.find();
    return entities.map(Product.fromEntity).map(p => p.toResponseDto());
  }

  async findOne(id: number) {
    const entity = await this.productRepository.findOne({ where: { id } });
    if (!entity) {
      
      throw new NotFoundException(`Producto no encontrado con ID: ${id}`);
    }
    return Product.fromEntity(entity).toResponseDto();
  }

  async create(dto: CreateProductDto) {
   
    const existing = await this.productRepository.findOne({ where: { name: dto.name } });
    
    if (existing) {
      throw new ConflictException(`Ya existe un producto con el nombre: ${dto.name}`);
    }

    const product = Product.fromDto(dto);
    const saved = await this.productRepository.save(product.toEntity());
    return Product.fromEntity(saved).toResponseDto();
  }

  async update(id: number, dto: UpdateProductDto) {
    const entity = await this.productRepository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Producto no encontrado con ID: ${id}`);
    }

    const updated = Product.fromEntity(entity).update(dto).toEntity();
    const saved = await this.productRepository.save(updated);
    return Product.fromEntity(saved).toResponseDto();
  }

  async partialUpdate(id: number, dto: PartialUpdateProductDto) {
    const entity = await this.productRepository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException(`Producto no encontrado con ID: ${id}`);
    }

    const updated = Product.fromEntity(entity).partialUpdate(dto).toEntity();
    const saved = await this.productRepository.save(updated);
    return Product.fromEntity(saved).toResponseDto();
  }

  async delete(id: number) {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Producto no encontrado con ID: ${id}`);
    }
    return { message: 'Deleted successfully' };
  }
}