import {check, query} from 'express-validator';
import { validateResult } from '../utils/validator.handle';
import { NextFunction, Request, Response } from 'express';
const ValidatUpdateUser = [
    query('_id').exists().notEmpty(),
    check('name').exists().notEmpty().isLength({ min: 3, max: 99 }),
    check('lastname').exists().notEmpty().isLength({ min: 3, max: 99 }),
    check('password').exists().notEmpty().isLength({ min: 3, max: 15 }),
    check('email').exists().notEmpty().isEmail(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResult(req, res, next)}
    ]
    const validateGetOneUser = [
        query('_id').exists().notEmpty(),
         (req: Request, res: Response, next: NextFunction) => {
            return validateResult(req, res, next)}
        ]
    const validateRegisterUser=[
        check('name').exists().notEmpty().isLength({ min: 3, max: 99 }),
        check('lastname').exists().notEmpty().isLength({ min: 3, max: 99 }),
        check('password').exists().notEmpty().isLength({ min: 3, max: 15 }),
        check('email').exists().notEmpty().isEmail(),
        (req: Request, res: Response, next: NextFunction) => {
            return validateResult(req, res, next)
        },
    ] 
    export {ValidatUpdateUser,validateGetOneUser,validateRegisterUser}