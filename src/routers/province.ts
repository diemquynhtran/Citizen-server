import { provinceController } from "../controllers/province";
// quyền A1
const express = require("express");
const router = express.Router();

router.get("/", provinceController.getProvinces);
router.post("/create", provinceController.create);
export default router;
