import { provinceController } from "../controllers/province";
import { Role } from "../entities/user";
import { permissionUser } from "../middlewares/permission";
import { roleRequire } from "../middlewares/role";
// quyền A1
const express = require("express");
const router = express.Router();

router.get("/", provinceController.getProvinces);
router.get("/get", provinceController.getAll);
router.post("/create",roleRequire(Role.A1), permissionUser, provinceController.create);
router.put("/update",roleRequire(Role.A1), permissionUser, provinceController.update);
router.delete("/delete",roleRequire(Role.A1), permissionUser, provinceController.delete);
router.post("/getByName", permissionUser, provinceController.getByName);
export default router;
