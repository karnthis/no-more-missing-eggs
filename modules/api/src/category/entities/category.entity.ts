import {Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Kitchen} from '../../kitchen/entities/kitchen.entity';
import {Carton} from '../../carton/entities/carton.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  categoryName: string;

  @Column({type: 'json', nullable: true})
  metadata: {data: string[]};

  @Column({ length: 10 })
  status: string;

  @ManyToOne(type => Kitchen, kitchen => kitchen.category)
  public kitchen: Kitchen;

  @ManyToMany(type => Carton, carton => carton.categories)
  @JoinTable()
  cartons: Carton[];

}
