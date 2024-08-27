import { getModelForClass } from "@typegoose/typegoose";
import { User } from "./User";

export const UserModel = getModelForClass(User, {
  options: { customName: "users" },
});
