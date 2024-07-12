import { IsEmail, IsNotEmpty, MinLength, Matches, Validate } from 'class-validator';
import { IsValidUsername } from './validate-username';


export class CreateUserDto {
    @IsNotEmpty() // Ensure that the data is not null
    @Validate(IsValidUsername, { message: 'Username must contain only alphanumeric characters' })
    username: string;

    // Validate email string based on structure (Doesn't verify the email's functionality)
    @IsEmail({}, { message: 'Email must be a valid email address' })
    @IsNotEmpty()
    email: string;

    // Set password min length to 6 letters and enforce the usage of symbols, capital letters, and numbers.
    @IsNotEmpty()
    @MinLength(6)
    @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{6,}$/, {
        message: 'Password too weak. It must be at least 6 characters long, contain at least one uppercase letter, one number, and one special character.',
    })
    password: string;

    @IsNotEmpty()
    userGroupId: number;
}
