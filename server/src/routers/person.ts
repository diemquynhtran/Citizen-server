import { personController } from "../controllers/person";


const express = require("express");
const router = express.Router();

router.post("/create",personController.create);
export default router;
