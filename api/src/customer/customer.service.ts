import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerDao: Repository<Customer>,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    const customer = this.customerDao.create(createCustomerDto);
    this.customerDao.save(createCustomerDto);
    return customer;
  }

  findAll() {
    return this.customerDao.find({ relations: ['order'] });
  }

  findOne(id: number) {
    return this.customerDao.findOne({ where: { id: id } });
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    this.customerDao.update(id, updateCustomerDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.customerDao.delete(id);
  }
}
