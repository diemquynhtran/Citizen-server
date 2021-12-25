import { personController } from "../controllers/person";
import { Role } from "../entities/user";
import { permissionUser } from "../middlewares/permission";
import { roleRequire } from "../middlewares/role";


const express = require("express");
const router = express.Router();

router.post("/create", roleRequire(Role.B1, Role.B2), permissionUser,personController.create);
router.put("/update", roleRequire(Role.B1, Role.B2), permissionUser,personController.update);
router.delete("/delete", roleRequire(Role.B1, Role.B2),  permissionUser,personController.delete);
router.get("/getByRole", personController.getByRole);

export default router;
