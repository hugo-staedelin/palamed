import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../../order/entities/order.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  lastname: string;

  @Column()
  firstname: string;

  @OneToMany(() => Order, (order) => order.customer, { eager: false })
  order: Order[];
}
