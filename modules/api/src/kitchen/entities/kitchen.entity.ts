import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Membership} from '../../membership/entities/membership.entity';
import {Item} from '../../item/entities/item.entity';

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

  @OneToMany(type => Item, kItem => kItem.kitchen)
  public item: Item[];

}
