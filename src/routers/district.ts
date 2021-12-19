import { districtController } from "../controllers/district";
// quyền A2, quyền xem +A1
const express = require("express");
const router = express.Router();

router.get("/", districtController.getDistrict);
router.post("/create", districtController.create);
router.put("/update", districtController.update);
router.delete("/delete", districtController.delete);
export default router;
