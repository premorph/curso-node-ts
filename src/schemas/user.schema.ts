import { Model, model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

interface IUserModel extends Model<IUser> {
}
const userSchema = new Schema(
  {
    name: { type: String },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String, enum: ["admin", "user"], defaul: "user" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = model<IUser,IUserModel>("user", userSchema);
export { UserModel };
