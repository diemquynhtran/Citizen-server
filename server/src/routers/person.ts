import { personController } from "../controllers/person";


const express = require("express");
const router = express.Router();

router.post("/create",personController.create);
router.post("/update",personController.update);
router.delete("/delete",personController.delete);
router.get("/getByRole", personController.getByRole);

export default router;
