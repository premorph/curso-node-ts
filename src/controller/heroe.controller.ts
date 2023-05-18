import { HeroeModel } from "../schemas/heroe.model";
import { Request, Response } from "express";
import { header, matchedData } from "express-validator";
import { httpResponses } from "../utils/http.util";
import httpStatus from "http-status";
import { IHeroe } from "../interfaces/heroe.interface";
export const Register = async (req: Request, res: Response): Promise<void> => {
  const body = matchedData(req, { locations: ["body"] });
  try {
    const payload = await HeroeModel.create(body);
    if (!payload)
      return httpResponses(
        res,
        httpStatus.BAD_REQUEST,
        "something went wrong",
        false
      );
    return httpResponses<IHeroe>(res, httpStatus.OK, payload, true);
  } catch (error) {
    return httpResponses(res, httpStatus.INTERNAL_SERVER_ERROR, error, false);
  }
};
export const getAllHeroe = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const payload:any = await HeroeModel.FindAllData();
    if (payload.length <= 0)
      return httpResponses(
        res,
        httpStatus.BAD_REQUEST,
        "something went wrong",
        false
      );
    return httpResponses<IHeroe[]>(res, httpStatus.OK, payload, true);
  } catch (error) {
    return httpResponses(res, httpStatus.INTERNAL_SERVER_ERROR, error, false);
  }
};
export const getOneHeroe = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = matchedData(req, { locations: ["query"] });
    const payload:any = await HeroeModel.FindData()
    if (!payload)
      return httpResponses(
        res,
        httpStatus.BAD_REQUEST,
        "something went wrong",
        false
      );
    return httpResponses<IHeroe>(res, httpStatus.OK, payload, true);
  } catch (error) {
    return httpResponses(res, httpStatus.INTERNAL_SERVER_ERROR, error, false);
  }
};
export const updateOneHeroe = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = matchedData(req, { locations: ["query"] });
    const body = matchedData(req, { locations: ["body"] });
    const isExist = await HeroeModel.findOne({ _id: id });
    if (!isExist)
      return httpResponses(res, httpStatus.NOT_FOUND, "NOT_FOUND", false);
    const payload = await HeroeModel.updateOne({ _id: isExist._id }, body);
    if (!payload)
      return httpResponses(
        res,
        httpStatus.BAD_REQUEST,
        "something went wrong",
        false
      );
    return httpResponses(res, httpStatus.OK, payload, true);
  } catch (error) {
    return httpResponses(res, httpStatus.INTERNAL_SERVER_ERROR, error, false);
  }
};
export const deleteOneHeroe = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = matchedData(req, { locations: ["query"] });
    const deleted = await HeroeModel.deleteOne({ _id: id });
    if (!deleted)
      return httpResponses(
        res,
        httpStatus.BAD_REQUEST,
        "something went wrong",
        false
      );
    return httpResponses(res, httpStatus.OK, deleted, true);
  } catch (error) {
    return httpResponses(res, httpStatus.INTERNAL_SERVER_ERROR, error, false);
  }
};
