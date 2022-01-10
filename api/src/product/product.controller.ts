import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { response, Response } from 'express';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post('generate')
  generateStock(@Res() res: Response) {
    this.productService.generateProduct();
    res.status(HttpStatus.CREATED).json({ message: 'Successfully generated stock' });
  }

  @Patch(':id/increase/:quantity')
  increaseQuantity(@Param('id') id: number, @Param('quantity') quantity: number, @Res() res?: Response) {
    this.productService.incrementProductQuantity(id, quantity).then((result) => {
      switch (result) {
        case true:
          res.status(HttpStatus.OK).json({ message: 'Successfully updated product quantity' });
          return {
            message: 'Successfully updated product quantity',
          };
        case false:
          res
            .status(HttpStatus.NOT_ACCEPTABLE)
            .json({ message: 'Cannot update product quantity. Reason: Reached max capacity' });
          break;
        case result:
          res.status(HttpStatus.NOT_ACCEPTABLE).json({
            message:
              'Cannot update product quantity. Reason: Specified quantity amount is overload max stock capacity.',
            surplus: result,
          });
          return result;
        default:
          res.status(HttpStatus.BAD_REQUEST).json({ message: 'Default error message.' });
          break;
      }
    });
  }

  @Patch(':id/decrement/:quantity')
  decrementQuantity(@Res() res: Response, @Param('id') id: number, @Param('quantity') quantity: number) {
    this.productService.decrementProductQuantity(id, quantity).then((result) => {
      switch (result) {
        case true:
          res.status(HttpStatus.OK).json({ message: 'Successfully subtract product quantity' });
          break;
        case false:
          res.status(HttpStatus.NOT_ACCEPTABLE).json({
            message:
              'Cannot subtract product quantity. Reason: Quantity is already empty or the specified amount is too high',
          });
          break;
        default:
          res.status(HttpStatus.BAD_REQUEST).json({ message: 'Default error message.' });
          break;
      }
    });
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productService.remove(id);
  }
}
