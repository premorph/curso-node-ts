import { Router } from "express";
import { getAllUSer } from "../controller/user.controllers";

const router:Router = Router()

router.get("/",getAllUSer)

export  {router}