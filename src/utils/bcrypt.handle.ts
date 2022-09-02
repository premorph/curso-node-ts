import { hash, compare } from 'bcryptjs'

/**
 * 
 * @param textPlain 
 * @returns string
 */
async function encryptPassword(textPlain:string):Promise<string>{
    const password = await hash(textPlain,10)
    return password
}
/**
 * 
 * @param textPlain 
 * @param textHash 
 * @returns  boolean
 */
async function Compare(textPlain:string, textHash:string):Promise<boolean>{
    return await compare(textPlain,textHash)
}
export {encryptPassword,Compare}