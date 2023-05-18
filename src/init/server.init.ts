import 'dotenv/config'
import { IServer } from "../model/server.model";
import express,{ Application, json, urlencoded } from "express";
import router from "../routes";
import cors from 'cors'
import { DB } from '../config/mongo.config';
export class Server implements IServer{
    app:Application = express()
    port:number=3000
    constructor(){
        this.config();
        this.routes();
        this.db();  
    }
    config(): void {
        this.app.use(cors())
        this.app.use(json())
        this.app.use(urlencoded({extended:true}))
    }
    routes(): void {
        this.app.use("/api/v1", router)
    }
    initialized(): void {
       this.app.listen(this.port,()=>console.log("server on port ", this.port))
    }
   async db():Promise<void>{
        const db= new DB()
        db.DbConnect().then().catch()
    }
}