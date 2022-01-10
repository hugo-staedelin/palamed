import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { StockService } from '../stock/stock.service';
import { Stock } from '../stock/entities/stock.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly productDao: Repository<Product>,
    private readonly stockService: StockService,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = this.productDao.create(createProductDto);
    this.productDao.save(createProductDto);
    return product;
  }

  findAll() {
    return this.productDao.find();
  }

  findOne(id: number) {
    return this.productDao.findOne(id);
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.productDao.update(id, {
      reference: updateProductDto.reference,
      type: updateProductDto.type,
      label: updateProductDto.label,
    });
  }

  remove(id: number) {
    return this.productDao.delete(id);
  }

  generateProduct() {
    const stock = {
      id: 1,
      capacity: 64,
    };
    const data = [
      {
        reference: 1,
        label: 'Chaise',
        quantity: 16,
        type: 'Meuble',
        stock: stock,
      }
    ];
    this.productDao.create(data);
    this.productDao.save(data);
  }

  async incrementProductQuantity(productId: number, quantityToAdd: number) {
    let stock, product, products;
    await this.findOne(productId).then((productResult: Product) => {
      product = productResult;
    });
    stock = product.stock;
    await this.stockService.findOne(stock.id).then((stockResult: Stock) => {
      products = stockResult.product;
    });
    let sum = 0;
    for (const item of products) {
      sum += item.quantity;
      if (sum == stock.capacity) {
        return false;
      }
    }
    const newQuantity = parseInt(quantityToAdd.toString());
    if (sum + newQuantity > stock.capacity) {
      const diff: number = sum + newQuantity - stock.capacity;
      return diff;
    } else {
      await this.productDao.update(productId, {
        quantity: product.quantity + newQuantity,
      });
      return true;
    }
  }

  async decrementProductQuantity(productId: number, quantityToRemove: number) {
    let product;
    await this.findOne(productId).then((productResult: Product) => {
      product = productResult;
    });
    if (product.quantity == 0 || product.quantity - quantityToRemove < 0) {
      return false;
    } else {
      await this.productDao.update(productId, {
        quantity: product.quantity - quantityToRemove,
      });
      return true;
    }
  }
}
