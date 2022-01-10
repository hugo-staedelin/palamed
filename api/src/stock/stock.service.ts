import { HttpException, Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';
import { createQueryBuilder, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StockService {
  constructor(@InjectRepository(Stock) private readonly stockDao: Repository<Stock>) {}

  create(createStockDto: CreateStockDto) {
    const stock = this.stockDao.create(createStockDto);
    this.stockDao.save(createStockDto);
    return stock;
  }

  findAll() {
    return this.stockDao.find({
      relations: ['product'],
    });
  }

  findOne(id: number) {
    return this.stockDao.findOne({
      where: { id: id },
      relations: ['product'],
    });
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    this.stockDao.update(id, updateStockDto);
    return this.stockDao.findOne(id);
  }

  removeAll() {
    return this.stockDao.createQueryBuilder('stock').delete().execute();
  }

  remove(id: number) {
    return this.stockDao.delete(id);
  }

  generateStock() {
    const data = {
      id: 1,
      capacity: 64,
    };
    this.stockDao.create(data);
    this.stockDao.save(data);
  }
}
