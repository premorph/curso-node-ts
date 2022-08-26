import { IServer } from "@model/server.model";
import express,{ Application } from "express";
import router from "../routes";
export class Server implements IServer{
    app:Application = express()
    port:number=3000
    constructor(){
        this.config();
        this.routes();
    }
    config(): void {
 
    }
    routes(): void {
        this.app.use("/api/v1", router)
    }
    initialized(): void {
       this.app.listen(this.port,()=>console.log("server on port ", this.port))
    }
}