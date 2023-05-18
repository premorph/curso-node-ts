import { Schema, model } from 'mongoose'
import { IStorage } from '../interfaces/storage.interface'
//import mongooseDelete from 'mongoose-delete-ts';

const storageSchema = new Schema<IStorage>(
    {
        filename: { type: String, require: true },
        fileOwner: { type: Schema.Types.ObjectId, ref: 'fileOwner' },
        typeF: { type: String },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

//storageSchema.plugin(mongooseDelete, { delete: true });
export const StorageModel = model<IStorage>('storage', storageSchema)