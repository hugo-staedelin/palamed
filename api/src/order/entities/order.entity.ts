import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '../../customer/entities/customer.entity';
import { ProductsFromOrder } from '../../products-from-orders/entities/products-from-order.entity';

@Entity()
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  reference: number;

  @OneToMany(() => ProductsFromOrder, (productsFromOrder: ProductsFromOrder) => productsFromOrder.order)
  productsFromOrder: ProductsFromOrder[];

  @ApiProperty()
  @ManyToOne(() => Customer, (customer) => customer.order, { cascade: true, eager: true })
  customer: Customer;
}
