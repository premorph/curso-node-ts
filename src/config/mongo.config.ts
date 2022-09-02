import 'dotenv/config'
import {connect} from 'mongoose'

export class DB{
    constructor(){

    }
    
async  DbConnect(){
    try {
     const DB_URI =<string> process.env.DB_URI
     await connect(DB_URI,{},(err:any)=>{
         if(err){
            return  console.log(err)
         }else{
             console.log("Connect MONGO")
         }
     })
    } catch (e) {
     console.log(e)
    }
 }
}