import { userController } from "../controllers/user";
import { userDistrictController } from "../controllers/userDistrict";
import { userProvinceController } from "../controllers/userProvince";
import { userVillageController } from "../controllers/userVillage";
import { userwardController } from "../controllers/userWard";

const express = require("express");
const router = express.Router();

router.get("/province", userProvinceController.get);
router.post("/province/create",userProvinceController.create);

router.get("/district", userDistrictController.get);
router.post("/district/create",userDistrictController.create);

router.get("/ward", userwardController.get);
router.post("/ward/create",userwardController.create);

router.get("/village", userVillageController.get);
router.post("/village/create",userVillageController.create);


export default router;
