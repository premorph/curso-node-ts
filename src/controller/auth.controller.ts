import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { UserModel } from "../schemas/user.schema";
import { Compare, encryptPassword, tokenSign } from "../utils";

async function LoginCtrl(res: Response, req: Request) {
  try {
    const body = matchedData(req);
    const user = await UserModel.findOne({ email: body.email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        message: { text: "bad request" },
      });
    }
    const validPassword = await Compare(body.password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        message: { text: "bad request" },
      });
    }
    const token = tokenSign(user);
    user.set("password", undefined,{strict:false})

    return res.status(200).json({
      ok: true,
      user,
      token,
    });
  } catch (error) {
    console.log(error);
  }
}

async function RegisterCtrl(res: Response, req: Request) {
  try {
    const body = matchedData(req)
    const password = encryptPassword(body.password)
    const data={...body, password}
    const user = await UserModel.create(data)
    user.set("password", undefined,{strict:false})

    const result ={
        token: await tokenSign(user),
        user:user
    }
    res.status(201)
    return res.send({result})
   
  } catch (error) {
    console.log(error)
  }
}
export { LoginCtrl, RegisterCtrl };
