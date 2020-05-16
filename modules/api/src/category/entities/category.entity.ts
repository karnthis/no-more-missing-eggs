import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Kitchen} from '../../kitchen/entities/kitchen.entity';
import {Item} from '../../item/entities/item.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  categoryName: string;

  @ManyToOne(type => Kitchen, kitchen => kitchen.category)
  public kitchen: Kitchen;

  @ManyToMany(type => Item, item => item.categories)
  @JoinTable()
  items: Item[];

}
