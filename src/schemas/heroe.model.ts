import { Model, Schema, Types, model } from "mongoose";
import { IHeroe } from "../interfaces/heroe.interface";

 interface HeroeExtend extends Model<IHeroe>{
        FindAllData(): void
        FindData(): void
 }
const heroeSchema = new Schema<IHeroe>({
name:{type:String,required:true},
avatar:{type:Types.ObjectId,ref:'storage',require:false},
superPower:{type:[],required:true}    
})
heroeSchema.static('FindAllData',function(){
    const joinData:any = this.aggregate([
        {
            $lookup: {
                from: 'storages',
                localField: '_id',
                foreignField: 'avatar',
                as: 'avatar',
            },
        },
    ])
    return joinData
})
heroeSchema.static('FindData',function (_id){
    const joinData = this.aggregate([
        {
            $match: _id,
        },
        {
            $lookup: {
                from: 'storages',
                localField: '_id',
                foreignField: 'avatar',
                as: 'avatar',
            },
        },
    ])
    return joinData
})
export const HeroeModel = model<IHeroe,HeroeExtend>('heroe',heroeSchema)