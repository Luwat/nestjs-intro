import { IsArray, IsNotEmpty, ValidateNested } from "class-validator";
import { CreateUserDto } from "./create-user.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";

export class CreateManyUsersDto {
    @ApiProperty({
        description: 'List of users to create',
        required: true,
        items: {
            type: 'User'
        }
    })
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true})
    @Type(() => CreateUserDto)
    users: CreateUserDto[];
}