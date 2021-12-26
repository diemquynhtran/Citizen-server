import { analyticsController } from "../controllers/analytics";
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
router.post("/getByRequest", personController.getByRequest);

// router.get(":id/analytics/gender", analyticsController.gender);
// router.get(":id/analytics/age", analyticsController.age);

router.post("/analytics/gender", analyticsController.gender);
router.post("/analytics/age", analyticsController.age);
//router.post("/analytics/level", analyticsController.level);


export default router;
