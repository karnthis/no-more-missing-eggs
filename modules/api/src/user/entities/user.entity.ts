import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Membership} from '../../membership/entities/membership.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Index('username-index')
  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 100, select: false })
  password: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 10 })
  status: string;

  @Column('date')
  lastUpdated: Date;

  @OneToMany(type => Membership, membership => membership.user)
  public memberships: Membership[];

}
