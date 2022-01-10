import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from '../product/product.service';
import { Product } from '../product/entities/product.entity';
import { Stock } from '../stock/entities/stock.entity';
import { StockService } from '../stock/stock.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Product, Stock])],
  controllers: [OrderController],
  providers: [OrderService, StockService, ProductService],
})
export class OrderModule {}
