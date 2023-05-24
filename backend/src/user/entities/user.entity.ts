import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { RoleEnum } from "src/common/role";

@Schema()
export class User {
    @Prop({ required: true, default: RoleEnum.DATA_ENTRY })
    role: string

    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    mobile: string

    @Prop({ required: true })
    email: string

    @Prop({ required: false })
    dob: Date

    @Prop({ required: false })
    examPreparing: string

    @Prop({ required: false })
    college: string

    @Prop({ required: false })
    state: string

    @Prop({ required: false })
    image: string

    @Prop({ default: new Date() })
    createdAt: Date;

    @Prop({})
    updatedAt: Date;

    @Prop({ default: true })
    status: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);

