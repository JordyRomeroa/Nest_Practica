import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    AuthModule,
    StatusModule
  ],
})
export class AppModule {}



