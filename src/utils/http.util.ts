import { Response } from 'express'
import httpStatus from 'http-status'


const httpResponses =<T> (
    res: Response,
    status: number,
    data: T,
    ok: boolean
) => {
    res.status(status).send({ ok, data: data })
}

export { httpResponses }