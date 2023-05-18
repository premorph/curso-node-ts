import { Request, Response } from "express";
import { UserModel } from "../schemas/user.schema";
import { matchedData } from "express-validator";

async function getAllUSer(req: Request, res: Response) {
  try {
    const data = await UserModel.find();
    if (data.length < 0) {
      return res.status(400).json({ ok: false, message: "users not found" });
    }
    return res.status(200).json({ data });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error });
  }
}
async function getOne(req: Request, res: Response) {
  try {
    const id = matchedData(req, { locations: ["query"] });
    const payload = await UserModel.findOne(id);
    if (!payload)
      return res.status(400).json({ ok: false, message: "users not found" });
    return res.status(200).json({ payload });
  } catch (error) {
    return res.status(400).json({ ok: false, message: error });
  }
}
async function updateOne(req: Request, res: Response) {
  const id = matchedData(req, { locations: ["query"] });
  const body = matchedData(req, { locations: ["body"] });
  const isExist = await UserModel.findOne(id);
  if (!isExist)
    return res.status(400).json({ ok: false, message: "users not found" });
  const payload = await UserModel.updateOne(isExist.id, body);
  if (!payload)
    return res.status(400).json({ ok: false, message: "users not found" });
  return res.status(200).json({ payload });
}
async function deleteOne(req:Request,res:Response){
  const id = matchedData(req, { locations: ["query"] });
  const isExist = await UserModel.findOne(id);
  if (!isExist)
    return res.status(400).json({ ok: false, message: "users not found" });
    const deleted= await UserModel.deleteOne(id)
    if(!deleted)
    return res.status(400).json({ ok: false, message: "Something went wrong" });
  return res.status(200).json({ ok:true,message:'user_deleted' });

}
export { getAllUSer, getOne,updateOne,deleteOne };
