import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator'
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(96)
    firstName: string;

    @IsString()
    @IsOptional()
    @MinLength(3)
    @MaxLength(96)
    lastName?: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(96)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(96)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
        message: 'Minimum of 8 characters including at least one number, letter and a special character'
    })
    password: string;
}