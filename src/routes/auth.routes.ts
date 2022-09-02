import { Router } from "express";
import * as Ctrl from '../controller'
const router:Router = Router()
router.post("/login",Ctrl.LoginCtrl)
router.post("/register",Ctrl.RegisterCtrl)
export  {router}