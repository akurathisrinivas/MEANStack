import { Prop } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { CentersInterface } from "../organisations.interface"

export class CreateOrganisationsDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    organisationName: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    state: string

    @IsNotEmpty()
    @IsArray()
    readonly centers: CentersInterface[];

    @ApiProperty()
    createdAt: Date

    @ApiProperty()
    createdBy: string

    @ApiProperty()
    status: boolean
    
}