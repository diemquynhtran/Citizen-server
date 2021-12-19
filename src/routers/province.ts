import { provinceController } from "../controllers/province";
import { permissionUser } from "../middlewares/permission";
// quyền A1
const express = require("express");
const router = express.Router();

router.get("/", provinceController.getProvinces);
router.post("/create", permissionUser, provinceController.create);
router.put("/update", permissionUser, provinceController.update);
router.delete("/delete", permissionUser, provinceController.delete);
export default router;
