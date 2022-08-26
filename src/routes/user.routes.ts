import { Response, Request, Router } from "express";
import { getAllUSer } from "../controller/user.controllers";

const router:Router = Router()
router.get("/",getAllUSer)
router.put("/",(req:Request,res:Response)=>{
    const hola="<h1>put</h1>"
    return res.json(hola)
})

export  {
    router
}