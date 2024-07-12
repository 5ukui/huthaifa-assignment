import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string; // can be 'pending', 'submitted', 'finished'

  @ManyToOne(() => User, user => user.tasksAssigned)
  assignedBy: User;

  @ManyToOne(() => User, user => user.tasksReceived)
  assignedTo: User;
}
