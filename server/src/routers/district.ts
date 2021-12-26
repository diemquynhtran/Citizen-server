import { districtController } from "../controllers/district";
import { Role } from "../entities/user";
import { permissionUser } from "../middlewares/permission";
import { roleRequire } from "../middlewares/role";
// quyền A2, quyền xem +A1
const express = require("express");
const router = express.Router();

router.get("/", districtController.getDistrictUser);
router.get("/getByRole", districtController.getDistrictsByRole);
router.post("/getByProvince", districtController.getByProvince);

router.post("/create",permissionUser, districtController.create);
router.put("/update",permissionUser, districtController.update);
router.delete("/delete",permissionUser, districtController.delete);
export default router;
