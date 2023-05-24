import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";

@Schema()
export class Student {

    

    @Prop({ required: true })
    studentName: string

    @Prop({ required: true })
    studentEmail: string

    @Prop({ required: true })
    studentMobile: string

    @Prop({ required: false })
    roomNo: number

    @Prop({ required: false })
    cabinNo: number

    @Prop({ required: false })
    mbbsBatch: string
 
    @Prop({ required: false })
    image: string

    @Prop({default:new Date()})
    createdAt: Date;

    @Prop({ required: false })
    updatedAt: Date;

    @Prop({ required: false })
    updatedBy: string;

    @Prop({ required: false })
    createdBy: string; 

    @Prop({default:true})
    status: boolean
}

export const StudentSchema = SchemaFactory.createForClass(Student);
