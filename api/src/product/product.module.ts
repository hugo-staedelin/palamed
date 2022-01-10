import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { StockService } from '../stock/stock.service';
import { Stock } from '../stock/entities/stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Stock])],
  controllers: [ProductController],
  providers: [ProductService, StockService],
})
export class ProductModule {}
