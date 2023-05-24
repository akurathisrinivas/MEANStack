import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Prop } from '@nestjs/mongoose';

export class UpdateStudentDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    studentName: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    studentEmail: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    studentMobile: string


    @ApiProperty()
    @IsNumber()
    roomNo: number

    @ApiProperty()
    @IsNumber()
    cabinNo: number

    @ApiProperty()
    @IsString()
    mbbsBatch: string

    @ApiProperty()
    @IsDate()
    updatedAt: Date

    @ApiProperty()
    @IsString()
    updatedBy: string

    @ApiProperty()
    @IsBoolean()
    status: boolean
    
}
