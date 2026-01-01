import { Product } from "../entities/product.entity";


export class ProductMapper {
    static toEntity(id: number, dto: any): Product {
        return new Product(id, dto.name, dto.price, dto.description);
    }

    static toResponse(entity: Product) {
        return {
            id: entity.id,
            name: entity.name,
            price: entity.price,
            description: entity.description
        };
    }
}