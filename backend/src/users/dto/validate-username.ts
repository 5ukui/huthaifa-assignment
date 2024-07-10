import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'isValidUsername', async: false })
export class IsValidUsername implements ValidatorConstraintInterface {
    validate(username: string, args: ValidationArguments) {
        // Check if username contains only alphanumeric characters
        if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return false;
        }
        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return `Username must contain only alphanumeric characters (letters and numbers)`;
    }
}