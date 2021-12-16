import { provinceController } from "../controllers/province";
// quyền A1
const express = require("express");
const router = express.Router();

router.get("/", provinceController.getProvinces);
export default router;
