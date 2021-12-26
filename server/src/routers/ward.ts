import { wardController } from "../controllers/ward";
import { Role } from "../entities/user";
import { roleRequire } from "../middlewares/role";
// quyền A3, quyền xem +A2
const express = require("express");
const router = express.Router();

router.get("/", wardController.getAllwards);
router.get("/getByA3", wardController.getwardsByRole);
router.post("/create", wardController.create);
router.post("/getByDistrict", wardController.getByDistrict);
router.put("/update", wardController.update);
router.delete("/delete", wardController.delete);
export default router;
