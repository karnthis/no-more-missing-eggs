import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Category} from '../../category/entities/category.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ length: 50 })
  category: string;

  @Column('int')
  count: number;

  @Column('date')
  expiration: number;

  @Column('date')
  added: number;

  @Column()
  isDelete: boolean;

  // @ManyToOne(type => Kitchen, kitchen => kitchen.item)
  // public kitchen: Kitchen;

  @ManyToMany(type => Category)
  categories: Category[];

}
