import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Animation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  source: string;

  @Column()
  author: string;
}
