import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';

@Entity({ name: 'User' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false })
    @IsNotEmpty() // Ensure that value is not empty
    username: string;

    @Column({ unique: true, nullable: false })
    @IsEmail() // Verify email based on string structure
    @IsNotEmpty() // Ensure that value is not empty
    email: string;

    @Column({ nullable: false })
    @IsNotEmpty()
    @MinLength(6) // Password minimum length
    @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{6,}$/, { // Password constraits
        message: 'Password too weak. It must be at least 6 characters long, contain at least one uppercase letter, one number, and one special character.',
    })
    password: string;
}