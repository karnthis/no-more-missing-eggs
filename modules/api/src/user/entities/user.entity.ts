import {Column, Entity, Index, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Membership} from '../../membership/entities/membership.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  firstName: string;

  @Column({ length: 50, nullable: false })
  lastName: string;

  @Index('username-index')
  @Column({ length: 50, nullable: false, unique: true })
  username: string;

  @Column({ length: 100, nullable: false, select: false })
  password: string;

  @Column({ length: 100, nullable: false })
  emailAddress: string;

  @Column({ length: 10, nullable: false })
  status: string;

  @OneToMany(type => Membership, membership => membership.user)
  public membership: Membership[];

}
