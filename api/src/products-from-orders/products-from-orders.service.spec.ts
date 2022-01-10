import { Test, TestingModule } from '@nestjs/testing';
import { ProductsFromOrdersService } from './products-from-orders.service';
import { ProductsFromOrderController } from './products-from-orders.controller';
import { ProductService } from '../product/product.service';
import { StockService } from '../stock/stock.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Stock } from '../stock/entities/stock.entity';
import { Product } from '../product/entities/product.entity';
import { ProductsFromOrder } from './entities/products-from-order.entity';
import { Order } from '../order/entities/order.entity';
import { OrderService } from '../order/order.service';
import { Repository } from 'typeorm';
import { MockType, repositoryMockFactory } from '../../test/testUtils';

describe('ProductsFromOrdersService', () => {
  let service: ProductsFromOrdersService;
  let controller: ProductsFromOrderController;
  let repositoryMock: MockType<Repository<ProductsFromOrder>>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsFromOrderController],
      providers: [
        {
          provide: getRepositoryToken(Stock),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Product),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(ProductsFromOrder),
          useFactory: repositoryMockFactory,
        },
        {
          provide: getRepositoryToken(Order),
          useFactory: repositoryMockFactory,
        },
        StockService,
        ProductService,
        ProductsFromOrdersService,
        OrderService,
      ],
    }).compile();

    controller = module.get<ProductsFromOrderController>(ProductsFromOrderController);
    service = module.get<ProductsFromOrdersService>(ProductsFromOrdersService);
    repositoryMock = module.get(getRepositoryToken(ProductsFromOrder));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an new order', () => {
    const product = {
      reference: 1,
      label: 'Table',
      type: 'Meuble',
      quantity: 14,
    };
    const productFromOrders = {
      productFromOrderId: 1,
      quantity: 10,
      product: product,
      order: {
        reference: 1,
        lastname: 'Sérrien',
        firstname: 'Jean',
      },
    };
    repositoryMock.findOne.mockReturnValue(productFromOrders);
    expect(service.findOne(productFromOrders.productFromOrderId)).toBe(productFromOrders);
  });
});
