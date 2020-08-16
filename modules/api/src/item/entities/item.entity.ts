import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Category} from '../../category/entities/category.entity';
// import {Category} from '../../category/entities/category.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({type: 'int', nullable: true})
  barcode: number;

  @Column('int')
  count: number;

  @Column('date')
  expiration: Date;

  @Column('date')
  added: Date;

  @Column()
  isDelete: boolean;

  // @ManyToOne(type => Kitchen, kitchen => kitchen.item)
  // public kitchen: Kitchen;

  @ManyToMany(type => Category, category => category.items)
  categories: Category[];

}
