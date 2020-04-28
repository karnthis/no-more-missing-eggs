import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kitchenId: number;

  @Column()
  memberId: number;

  @Column({ length: 50, nullable: false })
  role: string;

}
