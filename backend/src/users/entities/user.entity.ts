import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'User' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    username: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;
}