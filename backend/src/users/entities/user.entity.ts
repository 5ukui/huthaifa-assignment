import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { UserGroup } from './group.entity';
import { Task } from './task.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    username: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @ManyToOne(() => UserGroup, userGroup => userGroup.users)
    userGroup: UserGroup;

    @OneToMany(() => Task, task => task.assignedBy)
    tasksAssigned: Task[];

    @OneToMany(() => Task, task => task.assignedTo)
    tasksReceived: Task[];
    
}