import { ObjectId } from "mongoose";

export interface IHeroe{
    name:string;
    superPower:string[],
    avatar:ObjectId
}