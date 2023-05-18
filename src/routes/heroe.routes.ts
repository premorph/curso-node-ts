import { Router } from "express";
import * as Ctrl from "../controller/";
import {
  ValidatorHeroeRegister,
  ValidatorHeroeRegisterGet,
  validatorHeroeUpdate,
} from "../validator/hero.validator";
import { Session } from "../middleware/auth.middlewate";
import { CheckRole } from "../middleware/role.middleware";

const router: Router = Router();
router.get("/", Ctrl.getAllUSer);
router.post(
  "/",
  Session,
  CheckRole(["admin", "user"]),
  ValidatorHeroeRegister,
  Ctrl.Register
);
router.get("/:_id", Session, ValidatorHeroeRegisterGet, Ctrl.getOneHeroe);
router.put(
  "/:_id",
  Session,
  CheckRole(["admin"]),
  validatorHeroeUpdate,
  Ctrl.updateOneHeroe
);
router.delete(
  "/:_id",
  Session,
  CheckRole(["admin"]),
  ValidatorHeroeRegisterGet,
  Ctrl.deleteOneHeroe
);
export { router };
