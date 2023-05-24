import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ObjectId } from "mongoose";
import * as mongoose from 'mongoose';
import { CentersInterface } from "../organisations.interface";
import { State } from '../../state/entities/state.entity';

@Schema()
export class Organisations {

    @Prop({ required: true })
    organisationName: string

    @Prop({ required: true,type: mongoose.Schema.Types.ObjectId, ref: State.name })
    state: string

    @Prop({ required: true})
    centers: CentersInterface[];

    @Prop({default:new Date()})
    createdAt: Date;

    @Prop({ default:new Date() })
    updatedAt: Date;

    @Prop({ required: false })
    updatedBy: string;

    @Prop({ required: false })
    createdBy: string; 

    @Prop({default:true})
    status: boolean
}

export const OrganisationsSchema = SchemaFactory.createForClass(Organisations);