import { Request } from 'express'
import multer, { diskStorage } from 'multer'

const storage = diskStorage({
    destination: function (req: Request, file: any, cb: any) {
        const pathStorage = `${__dirname}/../storage`
        cb(null, pathStorage)
    },
    filename: function (req: Request, file: any, cb: any) {
        const ext = file.originalname.split('.').pop()
        const filename = `file-${Date.now()}.${ext}`
        const extArr = ['jpg', 'png', 'jpeg', 'JPEG', 'PNG', 'JPG']
        if (extArr.indexOf(ext) < 0) {
            cb(new Error('Archivo no permitido'))
        }
        cb(null, filename)
    },
})

const uploadMiddleware = multer({ storage })

export { uploadMiddleware }