import 'dotenv/config'
import { IServer } from "@model/server.model";
import express,{ Application } from "express";
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
    }
    routes(): void {
        this.app.use("/api/v1", router)
    }
    initialized(): void {
       this.app.listen(this.port,()=>console.log("server on port ", this.port))
    }
    db():void{
        const db= new DB()
        db.DbConnect()
    }
}