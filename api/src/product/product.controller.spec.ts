import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { StockService } from '../stock/stock.service';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Stock } from '../stock/entities/stock.entity';

describe('ProductController', () => {
  let module: TestingModule;
  let productController: ProductController;
  let productService: ProductService;
  let stockService: StockService;
  const productMock = {
    reference: 1,
    label: 'Bois',
    type: 'Construction',
    quantity: 32,
    stock: {
      id: 1,
      quantity: 64,
    },
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: {},
        },
        StockService,
        {
          provide: getRepositoryToken(Stock),
          useValue: {},
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    stockService = module.get<StockService>(StockService);
    productController = module.get<ProductController>(ProductController);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Basic CRUD', () => {
    it('should create a product', async () => {
      const expectedResult = new CreateProductDto();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jest.spyOn(productService, 'findOne').mockResolvedValue(expectedResult);
      expect(await productController.findOne(1)).toBe(expectedResult);
    });

    it('should not return an entity of order', async () => {
      const expectedResult = undefined;
      jest.spyOn(productService, 'findOne').mockResolvedValue(expectedResult);
      await productController.findOne(1).then((result) => {
        expect(result).toBe(expectedResult);
      });
    });
  });

  describe('Update product quantity', () => {
    it('should increment product quantity', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jest.spyOn(productService, 'incrementProductQuantity').mockResolvedValue(productMock);
      productService.incrementProductQuantity(1, 32).then((result: boolean | number) => {
        expect(result).toBe(true);
      });
    });

    it('should detect the stock capacity is reached and return false', async () => {
      productMock.quantity = 64;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jest.spyOn(productService, 'findOne').mockResolvedValue(productMock);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jest.spyOn(productService, 'incrementProductQuantity').mockResolvedValue(productMock);
      productService.incrementProductQuantity(1, 65).then((result: boolean | number) => {
        expect(result).toBe(false);
      });
    });

    it('should decrement product quantity', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jest.spyOn(productService, 'incrementProductQuantity').mockResolvedValue(productMock);
      productService.decrementProductQuantity(1, 32).then((result: boolean | number) => {
        expect(result).toBe(true);
      });
    });
  });
});
