import { Types } from "mongoose";

export interface IUser{
    _id:string
    name:string;
    username:string;
    email:string;
    password:string;
    role:string;
}