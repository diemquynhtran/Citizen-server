import { wardController } from "../controllers/ward";
import { Role } from "../entities/user";
import { roleRequire } from "../middlewares/role";
// quyền A3, quyền xem +A2
const express = require("express");
const router = express.Router();

router.get("/",roleRequire(Role.A1, Role.A2, Role.A3), wardController.getAllwards);
router.get("/getByA3", wardController.getwardsByRole);
router.post("/create",roleRequire(Role.A3), wardController.create);
router.post("/getByDistrict", wardController.getByDistrict);
router.put("/update",roleRequire(Role.A3), wardController.update);
router.delete("/delete",roleRequire(Role.A3), wardController.delete);
export default router;
