import { Prop } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsNumber,IsDate, IsString, IsOptional } from "class-validator"

export class UpdateStateDto {


    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    stateName: string

    @ApiProperty()
    @IsOptional()
    status: boolean

    @ApiProperty()
    @IsDate()
    updatedAt: Date

    @ApiProperty()
    @IsString()
    updatedBy: string


}