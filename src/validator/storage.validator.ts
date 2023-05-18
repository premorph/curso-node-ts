import { query } from 'express-validator'
import { NextFunction, Request, Response } from 'express'
import { validateResult } from '../utils/validator.handle'

const validatorCreateStorage = [
    query('typeF').exists().notEmpty(),
    query('fileOwner').exists().notEmpty(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResult(req, res, next)
    },
]
export { validatorCreateStorage }