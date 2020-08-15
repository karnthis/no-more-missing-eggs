import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../../user/entities/user.entity';
import {Kitchen} from '../../kitchen/entities/kitchen.entity';

@Entity()
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  role: string;

  @Column({type: 'json', nullable: true})
  metadata: {data: string[]};

  @Column({ length: 10 })
  status: string;

  @Column('date')
  lastUpdated: Date;

  @ManyToOne(type => User, user => user.memberships)
  public user: User;

  @ManyToOne(type => Kitchen, kitchen => kitchen.memberships)
  public kitchen: Kitchen;

}
