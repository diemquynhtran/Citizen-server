import { personController } from "../controllers/person";
import { Role } from "../entities/user";
import { roleRequire } from "../middlewares/role";


const express = require("express");
const router = express.Router();

router.post("/create", roleRequire(Role.B1, Role.B2),personController.create);
router.post("/update", roleRequire(Role.B1, Role.B2),personController.update);
router.delete("/delete", roleRequire(Role.B1, Role.B2),personController.delete);
router.get("/getByRole", personController.getByRole);

export default router;
