import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { MockType, repositoryMockFactory } from '../../test/testUtils';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { StockService } from '../stock/stock.service';
import { Stock } from '../stock/entities/stock.entity';

describe('ProductService', () => {
  let service: ProductService;
  let controller: ProductController;
  let repositoryMock: MockType<Repository<Product>>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService, StockService, {
        provide: getRepositoryToken(Product),
        useFactory: repositoryMockFactory,
      },{
        provide: getRepositoryToken(Stock),
        useFactory: repositoryMockFactory,
      }],
    }).compile();

    service = module.get<ProductService>(ProductService);
    controller = module.get<ProductController>(ProductController);
    repositoryMock = module.get(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product and find it', () => {
    const product = {
      reference: 1,
      label: 'Table',
      type: 'Meuble',
      quantity: 14,
    };
    repositoryMock.findOne.mockReturnValue(product);
    expect(service.findOne(product.reference)).toBe(product);
  });
});
