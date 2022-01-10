import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { StockService } from '../stock/stock.service';
import { ProductService } from '../product/product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../product/entities/product.entity';
import { Stock } from '../stock/entities/stock.entity';

describe('-- Order Controller --', () => {
  let orderService: OrderService;
  let module: TestingModule;
  let orderController: OrderController;
  const orderMock = {
    reference: 1,
    cart: [
      {
        reference: 1,
        quantity: 32,
        product: {
          reference: 1,
          label: 'Bois',
          type: 'Construction',
          quantity: 64,
        },
      },
    ],
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        OrderService,
        {
          provide: getRepositoryToken(Order),
          useValue: {},
        },
        StockService,
        {
          provide: getRepositoryToken(Stock),
          useValue: {},
        },
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: {},
        },
      ],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
    orderController = module.get<OrderController>(OrderController);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Basic CRUD', () => {
    it('should create an entity of order', async () => {
      const expectedResult = new CreateOrderDto();
      jest.spyOn(orderService, 'findOne').mockResolvedValue(expectedResult);
      expect(await orderController.findOne(1)).toBe(expectedResult);
    });

    it('should not return an entity of order', async () => {
      const expectedResult = undefined;
      jest.spyOn(orderService, 'findOne').mockResolvedValue(expectedResult);
      await orderController.findOne(1).then((result) => {
        expect(result).toMatchObject({
          error: 'Not found',
          statusCode: 404,
        });
      });
    });
  });
});
