import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  color: string;

  @Column()
  name: string;

  @Column('float')
  length: number;

  @Column('float')
  width: number;

  @Column('float')
  height: number;

  @Column('float')
  weight: number;

  @Column()
  quantity: number;

  @Column()
  stackable: boolean;

  @Column()
  tiltable: boolean;
}
