import { Prop } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { CenterInterface } from "../centers.interface"

export class CreateOrganisationsDto {
   

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    state: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    organisation: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    centerName: string

    @IsNotEmpty()
    @IsArray()
    readonly courses: CenterInterface[];

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    createdBy: string

    @ApiProperty()
    status: boolean
    
}