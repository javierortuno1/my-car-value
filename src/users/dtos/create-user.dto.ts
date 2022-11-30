import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
    // Swagger
    @ApiProperty({
        description: 'email',
        example: "hi@hi.com"
    })
    // Validation rule for the DTO
    @IsEmail()
    email: string;

    // Swagger
    @ApiProperty({
        description: 'password',
        example: "123456"
    })
    @IsString()
    password: string;
}