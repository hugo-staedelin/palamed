import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsFromOrder } from './entities/products-from-order.entity';
import { Repository } from 'typeorm';
import { CreateProductsFromOrderDto } from './dto/create-products-from-order.dto';
import { UpdateProductsFromOrderDto } from './dto/update-products-from-order.dto';
import { ProductService } from '../product/product.service';
import { Product } from '../product/entities/product.entity';
import { OrderService } from '../order/order.service';

@Injectable()
export class ProductsFromOrdersService {
  constructor(
    @InjectRepository(ProductsFromOrder) private readonly productFromOrderDao: Repository<ProductsFromOrder>,
    private readonly productService: ProductService,
    private readonly orderService: OrderService
  ) {}

  async create(createProductFromOrder: CreateProductsFromOrderDto) {
    let product;
    await this.productService.findOne(createProductFromOrder.product.reference).then((result: Product) => {
      product = result;
    });
    const productsFromOrder = this.productFromOrderDao.create(createProductFromOrder);
    let orderState;
    await this.initOrder(product, productsFromOrder).then(result => {
      orderState = result;
    });
    switch (orderState) {
      case true:
        await this.productFromOrderDao.save(createProductFromOrder);
        return productsFromOrder;
      default:
        return undefined;
    }
  }

  findAll() {
    return this.productFromOrderDao.find();
  }

  findOne(id: number) {
    return this.productFromOrderDao.findOne(id);
  }

  update(id: number, updateProductsFromOrderDto: UpdateProductsFromOrderDto) {
    this.productFromOrderDao.update(id, updateProductsFromOrderDto);
    return this.productFromOrderDao.findOne(id);
  }

  async remove(id: number) {
    let productFromOrder;
    await this.productFromOrderDao.findOne(id).then(res => {
      productFromOrder = res;
    });
    let product;
    await this.productService.findOne(productFromOrder.product.reference).then((result: Product) => {
      product = result;
    });
    await this.productService.incrementProductQuantity(product.reference, productFromOrder.quantity);
    await this.productFromOrderDao.delete(id);
    await this.orderService.remove(productFromOrder.order.reference);
  }

  async initOrder(product: Product, productFromOrder: ProductsFromOrder): Promise<boolean> {
    if (product.quantity >= productFromOrder.quantity) {
      return this.productService.decrementProductQuantity(product.reference, productFromOrder.quantity);
    } else if (productFromOrder.quantity > product.quantity) {
      return;
    }
  }
}
