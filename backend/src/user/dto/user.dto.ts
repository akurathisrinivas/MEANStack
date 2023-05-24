import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsBoolean, IsDate } from "class-validator"

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    mobile: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    dob: Date

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    examPreparing: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    college: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    state: string

}

export class UpdateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    mobile: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    dob: Date

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    examPreparing: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    college: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    state: string

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    status: boolean
}

