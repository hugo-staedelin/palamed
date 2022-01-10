import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { StockModule } from './stock/stock.module';
import { CustomerModule } from './customer/customer.module';
import { ProductsFromOrdersModule } from './products-from-orders/products-from-orders.module';
import { TypeOrmConfigModule } from './config/type-orm-config.module';
import { TypeOrmConfigService } from './config/type-orm-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmConfigModule],
      useFactory: (configService: TypeOrmConfigService) => {
        const config: TypeOrmModuleOptions = {
          type: 'mariadb',
          host: configService.get('MYSQL_HOST'),
          port: +configService.get('MYSQL_PORT_INTERN'),
          username: configService.get('MYSQL_USER'),
          password: configService.get('MYSQL_PASSWORD'),
          database: configService.get('MYSQL_DATABASE'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
        return config;
      },
      inject: [TypeOrmConfigService]
    }),
    ProductModule,
    OrderModule,
    StockModule,
    CustomerModule,
    ProductsFromOrdersModule,
    TypeOrmConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
