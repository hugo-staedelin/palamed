import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsFromOrdersService } from './products-from-orders.service';
import { CreateProductDto } from '../product/dto/create-product.dto';
import { CreateProductsFromOrderDto } from './dto/create-products-from-order.dto';
import { UpdateProductDto } from '../product/dto/update-product.dto';
import { UpdateProductsFromOrderDto } from './dto/update-products-from-order.dto';
import { Response } from 'express';

@ApiTags('product from orders')
@Controller('product-from-orders')
export class ProductsFromOrderController {
  constructor(private readonly productFromOrderService: ProductsFromOrdersService) {}

  @Post()
  create(@Body() createProductsFromOrderDto: CreateProductsFromOrderDto, @Res() res: Response) {
    this.productFromOrderService.create(createProductsFromOrderDto).then((r) => {
      if (r) {
        res.status(HttpStatus.CREATED).json({
          Message: 'Order initialized',
          Order: r,
        });
      } else {
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ Error: 'Internal Error' });
      }
    });
  }

  @Get()
  findAll() {
    return this.productFromOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productFromOrderService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductsFromOrderDto: UpdateProductsFromOrderDto) {
    return this.productFromOrderService.update(id, updateProductsFromOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @Res() res: Response) {
    this.productFromOrderService.remove(id).then((r) => {
      res.status(HttpStatus.OK).json({ r });
    });
  }
}
