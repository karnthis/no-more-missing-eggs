import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {User} from '../../user/entities/user.entity';
import {Kitchen} from '../../kitchen/entities/kitchen.entity';

@Entity()
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  role: string;

  @Column({type: 'simple-json', nullable: true})
  metadata: {data: string[]};

  @Column({ length: 10 })
  status: string;

  @ManyToOne(type => User, user => user.membership)
  public user?: User;

  @ManyToOne(type => Kitchen, kitchen => kitchen.membership)
  public kitchen?: Kitchen;

}
