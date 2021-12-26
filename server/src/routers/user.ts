import { userController } from "../controllers/user";
import { userDistrictController } from "../controllers/userDistrict";
import { userProvinceController } from "../controllers/userProvince";
import { userVillageController } from "../controllers/userVillage";
import { userwardController } from "../controllers/userWard";
import { Role } from "../entities/user";
import { permissionUser } from "../middlewares/permission";
import { roleRequire } from "../middlewares/role";

const express = require("express");
const router = express.Router();

router.put("/cancelDeclare",permissionUser, userController.cancelDeclare); //khoá quyền khai báo (user.permission=false), gửi lên code của user cần khóa
router.put("/grantDeclare",permissionUser, userController.grantDeclare)

router.get("/province",roleRequire(Role.A1), userProvinceController.get);
router.post("/province/create",roleRequire(Role.A1), permissionUser,userProvinceController.create);

router.get("/district",roleRequire(Role.A1, Role.A2), userDistrictController.get);
router.post("/district/create", roleRequire(Role.A2), permissionUser,userDistrictController.create);

router.get("/ward",roleRequire(Role.A1, Role.A2, Role.A3), userwardController.get);
router.post("/ward/create",roleRequire(Role.A3), permissionUser,userwardController.create);

router.get("/village", roleRequire(Role.A1, Role.A2, Role.A3, Role.B1), userVillageController.get);
router.post("/village/create",roleRequire(Role.B1), permissionUser,userVillageController.create);

router.post("/confirmComplete", permissionUser, roleRequire(Role.B1), userController.comfirmComplete);


export default router;
