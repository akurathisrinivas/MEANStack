import { Prop } from "@nestjs/mongoose"
import { ApiProperty } from "@nestjs/swagger"
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateStudentDto {
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
    createdAt: Date

    @ApiProperty()
    createdBy: string

    @ApiProperty()
    status: boolean
    
}
