import { modelOptions, prop, Severity } from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";
import { ObjectId } from "mongoose";

@modelOptions({
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User extends TimeStamps {
  _id: ObjectId;

  @prop()
  title: string;

  @prop()
  description: string;

  @prop()
  name: string;

  @prop()
  email: string;

  @prop()
  image: string;

  @prop({ default: true })
  public: boolean;

  @prop({ default: false })
  featured: boolean;

  @prop({ default: false })
  promoted: boolean;
}
