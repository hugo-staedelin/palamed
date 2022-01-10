import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private readonly orderDao: Repository<Order>) {}

  create(createOrderDto: CreateOrderDto) {
    const order = this.orderDao.create(createOrderDto);
    this.orderDao.save(createOrderDto);
    return order;
  }

  findAll() {
    return this.orderDao.find();
  }

  findOne(id: number) {
    return this.orderDao.findOne(id);
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    this.orderDao.update(id, updateOrderDto);
    return this.orderDao.findOne(id);
  }

  remove(id: number) {
    return this.orderDao.delete(id);
  }
}
