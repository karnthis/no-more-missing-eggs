import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Membership} from '../../membership/entities/membership.entity';
import {Item} from '../../item/entities/item.entity';
import {Category} from '../../category/entities/category.entity';

@Entity()
export class Kitchen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  ownerId: number;

  @Column({ length: 50 })
  name: string;

  @OneToMany(type => Membership, membership => membership.kitchen)
  public membership: Membership[];

  @OneToMany(type => Category, category => category.kitchen)
  public category: Category[];

  // @OneToMany(type => Item, item => item.kitchen)
  // public item: Item[];

}
