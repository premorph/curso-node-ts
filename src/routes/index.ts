import { Router } from 'express'
import {readdirSync} from 'fs'
const PATH__ROUTER=__dirname
const router:Router=Router()
/**
 * 
 * @param file nombre del archivo de la carpeta rutas
 * @returns 
 */
function removeExtension(file:string):string{
    const CleanName= <string> file.split(".").shift()
    return CleanName
}
/**
 * 
 * @param filename Nombre del Filtro
 */
 function  loadRouter(file:string):void {
    const name = removeExtension(file)
    if(name!=='index'){
      import(`./${file}`).then((routerModule)=>{
        router.use(`/${name}`, routerModule.router);
      })
    }
  }
readdirSync(PATH__ROUTER).filter((file)=>loadRouter(file))

export default router;
