import { Request, Response } from 'express'
import { matchedData } from 'express-validator'
import { CallbackError } from 'mongoose'
import { httpResponses } from '../utils/http.util' 
import fs from 'fs'
import { IStorage } from '../interfaces/storage.interface'
import httpstatus from 'http-status'
import { StorageModel } from '../schemas/storage.model'
const MEDIA_PATH = 'https://localhost:3001/'

    const CreateStorage= async(req: Request, res: Response): Promise<void>=> {
        try {
            const file = req.file
            const body = matchedData(req, { locations: ['query'] })
            const data = {
                filename: file?.filename,
                fileOwner: body.fileOwner,
                typeF: body.typeF,
            }
            await StorageModel.create(
                data,
                (err: CallbackError, result: any) => {
                    if (err) {
                        return httpResponses(
                            res,
                            500,
                            err.message.toString(),
                            false
                        )
                    }
                    return httpResponses<IStorage>(res, 200, result, true)
                }
            )
        } catch (e: any) {
            return httpResponses(res, 500, e.message.toString(), false)
        }
    }
    const GetStorages=(req: Request, res: Response): void=> {
        StorageModel.find((err: CallbackError, result: IStorage[]) => {
            if (err) {
                return httpResponses(res, 400, 'Storages not found', false)
            }

            if (result.length <= 0) {
                httpResponses(res, 400, 'Storages not found', false)
            }
            return res.status(200).json({
                ok: true,
                data: result,
            })
        })
    }
    const GetStorage =(req: Request, res: Response): void=> {
        try {
            const { _id } = req.params
            StorageModel.find(
                { _id },
                (err: CallbackError, result: IStorage) => {
                    if (err)
                        return httpResponses(
                            res,
                            400,
                            'Storages not found',
                            false
                        )
                    return httpResponses<IStorage>(res,httpstatus.OK,result,true)
                } 
            )
        } catch (e: any) {
            return httpResponses(res, 500, e.message.toString(), false)
        }
    }

    const DeleteStorage= (req: Request, res: Response): void =>{
        try {
            const { id } = matchedData(req)
            const dataFile: any = StorageModel.findById(id)
            const deleteResponse: any = StorageModel.deleteOne({ _id: id })
            const filePath = `${MEDIA_PATH}/${dataFile.filename}` //TODO c:/miproyecto/file-1232.png
            fs.unlinkSync(filePath)
            const data = {
                filePath,
                deleted: deleteResponse.matchedCount,
            }
            res.send(data)
        } catch (e: any) {
            return httpResponses(res, 500, e.message.toString(), false)
        }
    }
    const UpdateStorage=(req: Request, res: Response): void=> {
        throw new Error('Method not implemented.')
    }

export {CreateStorage,GetStorages,GetStorage}