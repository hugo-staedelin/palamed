import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class ProductsFromOrder {
  @PrimaryGeneratedColumn()
  public productsFromOrderId: number;

  @ManyToOne(() => Order, (order: Order) => order.reference, { cascade: true, eager: true })
  public order: Order;

  @ManyToOne(() => Product, (product: Product) => product.reference, { eager: true })
  public product: Product;

  @Column()
  public quantity: number;
}
