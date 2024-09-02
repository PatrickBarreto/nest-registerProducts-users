import {MaxLength, IsString, IsNotEmpty} from 'class-validator'

export class CreateUserDto {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()   
    name: string
    email: string
}
