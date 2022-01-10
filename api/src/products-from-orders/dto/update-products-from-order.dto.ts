import { PartialType } from '@nestjs/swagger';
import { CreateProductsFromOrderDto } from './create-products-from-order.dto';

export class UpdateProductsFromOrderDto extends PartialType(CreateProductsFromOrderDto) {}
