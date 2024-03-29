import { Response, Request, Router } from "express";
import * as Ctrl from "../controller/";
import {
  ValidatUpdateUser,
  validateGetOneUser,
  validateRegisterUser,
} from "../validator/user.validator";
import { Session } from "../middleware/auth.middlewate";
import { CheckRole } from "../middleware/role.middleware";

const router: Router = Router();
router.get("/", Ctrl.getAllUSer);
router.post(
  "/",
  Session,
  CheckRole(["user", "admin"]),
  validateRegisterUser,
  Ctrl.RegisterCtrl
);
router.get("/:_id", validateGetOneUser, Ctrl.getOne);
router.put(
  "/:_id",
  Session,
  CheckRole(["admin"]),
  ValidatUpdateUser,
  Ctrl.updateOne
);
router.delete(
  "/:_id",
  Session,
  CheckRole(["admin"]),
  validateGetOneUser,
  Ctrl.deleteOne
);
export { router };
