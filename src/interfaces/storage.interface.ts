import { Types } from 'mongoose'
export interface IStorage {
    filename: string
    fileOwner: Types.ObjectId
    typeF: string
    _id?: Types.ObjectId
}