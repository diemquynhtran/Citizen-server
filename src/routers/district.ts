import { districtController } from "../controllers/district";
import { Role } from "../entities/user";
import { roleRequire } from "../middlewares/role";
// quyền A2, quyền xem +A1
const express = require("express");
const router = express.Router();

router.get("/", districtController.getDistricts);
router.post("/create",roleRequire(Role.A2), districtController.create);
router.put("/update",roleRequire(Role.A2), districtController.update);
router.delete("/delete",roleRequire(Role.A2), districtController.delete);
export default router;
