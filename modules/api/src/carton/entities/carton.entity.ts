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

  @Column({type: 'json', nullable: true})
  metadata: {};

  @Column({ length: 10 })
  status: string;

  @Column('date')
  lastUpdated: Date;

  @ManyToOne(type => Kitchen, kitchen => kitchen.cartons)
  public kitchen: Kitchen;

  @OneToMany(type => Item, item => item.carton)
  public items: Item[];

  @ManyToMany(type => Category, category => category.cartons)
  public categories: Category[];

}
