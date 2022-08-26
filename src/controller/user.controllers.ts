import { json, Response } from "express";

function getAllUSer (req:any,res:Response){
    const data ="hola"
    return res.status(200).json({data})
}
export {
    getAllUSer
}