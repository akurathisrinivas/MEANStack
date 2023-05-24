import { Prop } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsNumber,IsDate, IsString } from "class-validator"

export class CreateStateDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    stateName: string

    @ApiProperty()
    status: boolean

    @ApiProperty()
    @IsDate()
    createdAt: Date

    @ApiProperty()
    createdBy: string


}