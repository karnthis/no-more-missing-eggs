import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Kitchen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  ownerId: number;

  @Column('int')
  memberId: number;

  @Column('int')
  pantryId: number;

}
