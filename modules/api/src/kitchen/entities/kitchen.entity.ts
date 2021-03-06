import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Membership} from '../../membership/entities/membership.entity';
import {Category} from '../../category/entities/category.entity';
import {Carton} from '../../carton/entities/carton.entity';

@Entity()
export class Kitchen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  ownerId: number;

  @Column({ length: 50 })
  name: string;

  @Column({type: 'json', nullable: true})
  metadata: {cartonCount: number};

  @Column({ length: 10 })
  status: string;

  @Column('date')
  lastUpdated: Date;

  @OneToMany(type => Membership, membership => membership.kitchen)
  public memberships: Membership[];

  @OneToMany(type => Category, category => category.kitchen)
  public categories: Category[];

  @OneToMany(type => Carton, carton => carton.kitchen)
  public cartons: Carton[];

}
