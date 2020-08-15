import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Carton} from '../../carton/entities/carton.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

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

  @ManyToOne(type => Carton, carton => carton.item)
  public carton: Carton;

}
