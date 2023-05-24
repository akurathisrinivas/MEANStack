import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Prop } from '@nestjs/mongoose';
import { CentersInterface } from '../organisations.interface';

export class UpdateOrganisationsDto {

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
    updatedAt: Date

    @ApiProperty()
    updatedBy: string

    @ApiProperty()
    status: boolean
}