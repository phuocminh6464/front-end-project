import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn() EmpId: number;

  @Column({ length: 50 }) EmpName: string;

  @Column() DateOfBirth: Date ;

  @Column() Gender: string;

  @Column() Address: string;

  @Column() Phone: string;


}