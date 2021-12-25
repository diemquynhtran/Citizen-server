import { districtController } from "../controllers/district";
import { Role } from "../entities/user";
import { permissionUser } from "../middlewares/permission";
import { roleRequire } from "../middlewares/role";
// quyền A2, quyền xem +A1
const express = require("express");
const router = express.Router();

router.get("/",roleRequire(Role.A1), districtController.getAllDistricts);
router.get("/getByRole", districtController.getDistrictsByRole);
router.post("/getByProvince", districtController.getByProvince);

router.post("/create",roleRequire(Role.A2),permissionUser, districtController.create);
router.put("/update",roleRequire(Role.A2),permissionUser, districtController.update);
router.delete("/delete",roleRequire(Role.A2),permissionUser, districtController.delete);
export default router;
