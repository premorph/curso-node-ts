import { NextFunction, Response } from 'express'
import { matchedData } from 'express-validator'
import { httpResponses } from '../utils/http.util'
import { tokenVerify } from '../utils/jwt.handle'
import { UserModel } from '../schemas/user.schema'

const Session = async (
    req: any,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const header = matchedData(req, { locations: ['headers'] })
        if (!header) {
            return httpResponses(res, 401, 'NEED_SESSION', false)
        }
        const token = header.split(' ').pop()
        const verifyToken: any = await tokenVerify(token)
        if (!verifyToken) {
            return httpResponses(res, 401, 'NOT_PAYLOAD_DATA', false)
        }
        const user: any = await UserModel.findOne(verifyToken._id)
        req.user = user
        next()
    } catch (e: any) {
        return httpResponses(res, 401, e.message.toString(), false)
    }
}

export { Session }