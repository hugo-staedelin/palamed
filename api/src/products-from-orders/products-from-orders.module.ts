import { Module } from '@nestjs/common';
import { ProductsFromOrdersService } from './products-from-orders.service';
import { ProductsFromOrderController } from './products-from-orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsFromOrder } from './entities/products-from-order.entity';
import { Product } from '../product/entities/product.entity';
import { ProductService } from '../product/product.service';
import { StockService } from '../stock/stock.service';
import { Stock } from '../stock/entities/stock.entity';
import { Order } from '../order/entities/order.entity';
import { OrderService } from '../order/order.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductsFromOrder, Stock, Order])],
  controllers: [ProductsFromOrderController],
  providers: [ProductService, ProductsFromOrdersService, StockService, OrderService],
})
export class ProductsFromOrdersModule {}
