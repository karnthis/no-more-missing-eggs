import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Carton} from '../../carton/entities/carton.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column('int')
  barcode: number;

  @Column('int')
  count: number;

  @Column('date')
  expiration: Date;

  @Column('date')
  added: Date;

  @Column({type: 'json', nullable: true})
  metadata: {data: string[]};

  @Column({ length: 10 })
  status: string;

  @Column('date')
  lastUpdated: Date;

  @ManyToOne(type => Carton, carton => carton.items)
  public carton: Carton;

}
