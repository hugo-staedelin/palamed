import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Stock } from '../../stock/entities/stock.entity';
import { ProductsFromOrder } from '../../products-from-orders/entities/products-from-order.entity';

@Entity()
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  reference: number;

  @Column()
  label: string;

  @Column()
  type: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Stock, (stock) => stock.product, { cascade: true, eager: true })
  stock: Stock;

  @OneToMany(() => ProductsFromOrder, (productsFromOrder: ProductsFromOrder) => productsFromOrder.product, { cascade: true })
  order: ProductsFromOrder[];
}
