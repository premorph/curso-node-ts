import { Router } from 'express'
import { uploadMiddleware } from '../utils/storage.util'
import * as Ctrl from '../controller'
import { validatorCreateStorage } from '../validator/storage.validator'

const router: Router = Router()
router.get('/', Ctrl.GetStorages)

router.post(
    '/',
    validatorCreateStorage,
    uploadMiddleware.single('levelFile'),
    Ctrl.CreateStorage
)
export { router }