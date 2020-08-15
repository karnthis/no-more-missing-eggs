import {Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Category} from '../../category/entities/category.entity';
import {Kitchen} from '../../kitchen/entities/kitchen.entity';
import {Item} from '../../item/entities/item.entity';

@Entity()
export class Carton {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({type: 'int', nullable: true})
  barcode: number;

  @Column({type: 'simple-json', nullable: true})
  metadata: {data: string[]};

  @Column({ length: 10 })
  status: string;

  @ManyToOne(type => Kitchen, kitchen => kitchen.carton)
  public kitchen: Kitchen;

  @OneToMany(type => Item, item => item.carton)
  public item: Item[];

  @ManyToMany(type => Category, category => category.cartons)
  categories: Category[];

}
