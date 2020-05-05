import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Kitchen} from '../../kitchen/entities/kitchen.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  count: number;

  @Column('date')
  expiration: number;

  @Column('date')
  added: number;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ length: 50 })
  category: string;

  @ManyToOne(type => Kitchen, kitchen => kitchen.item)
  public kitchen: Kitchen;

}
