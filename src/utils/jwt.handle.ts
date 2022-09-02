import { sign, verify } from "jsonwebtoken";
import { IUser } from "../interfaces/user.interface";
const JWT_SECRET = <string>process.env.JWT_SECRET;
async function tokenSign(user: IUser): Promise<string> {
  const result = sign({ id: user._id, role: user.role }, JWT_SECRET, {
    expiresIn: "2h",
  });
  return result;
}

async function tokenVerify(token:string){
 const isOk= verify(token,JWT_SECRET);
 return isOk
}

export {tokenSign,tokenVerify}