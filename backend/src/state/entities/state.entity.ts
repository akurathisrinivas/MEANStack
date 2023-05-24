import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";

@Schema()
export class State {

    

    @Prop({ required: true })
    stateName: string

    @Prop({default:new Date()})
    createdAt: Date;

    @Prop({ default:new Date() })
    updatedAt: Date;

    @Prop({ required: false })
    updatedBy: string;

    @Prop({ required: false })
    createdBy: string; 

    @Prop({ default:true})
    status: boolean

     
}

export const StateSchema = SchemaFactory.createForClass(State);
