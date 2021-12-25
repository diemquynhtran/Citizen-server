import { villageController } from "../controllers/village";
import { Role } from "../entities/user";
import { roleRequire } from "../middlewares/role";
// quyền B1
const express = require("express");
const router = express.Router();

router.get("/",roleRequire(Role.A1, Role.A2, Role.A3), villageController.getAllvillages);
router.get("/getByB1", villageController.getvillagesByRole);
router.post("/create",roleRequire(Role.B1),roleRequire(Role.B1), villageController.create);
router.post("/getByWard", villageController.getByWard);
router.put("/update", roleRequire(Role.B1),roleRequire(Role.B1), villageController.update);
router.delete("/delete",roleRequire(Role.B1), villageController.delete);
export default router;
