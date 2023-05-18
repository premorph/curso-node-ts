import { check, query } from "express-validator";
import { validateResult } from "../utils/validator.handle";
import { NextFunction, Request, Response } from "express";

export const ValidatorHeroeRegister = [
  check("name").exists().notEmpty().isLength({ min: 3, max: 99 }),
  check("superPower").exists().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

export const validatorHeroeUpdate = [
  query("_id").exists().notEmpty(),
  check("name").exists().notEmpty().isLength({ min: 3, max: 99 }),
  check("superPower").exists().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];

export const ValidatorHeroeRegisterGet = [
  query("_id").exists().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    return validateResult(req, res, next);
  },
];
