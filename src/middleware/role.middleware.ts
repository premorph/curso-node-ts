import { NextFunction, Response } from 'express'

import { httpResponses } from '../utils/http.util'

/**
 *
 * @param roles array of roles by users accepted
 * @Example ['admin','user']
 * @constructor
 */
const CheckRole =
    (roles: string[]) => (req: any, res: Response, next: NextFunction) => {
        try {
            const { user } = req
            const rolesByUser = user.role
            const checkValueRol = roles.some((rolSingle: any) =>
                rolesByUser.includes(rolSingle)
            )
            if (!checkValueRol) {
                return httpResponses(res, 403, 'USER_NOT_PERMISSIONS', false)
            }
            next()
        } catch (e: any) {
            return httpResponses(res, 403, e.message.toString(), false)
        }
    }

export { CheckRole }