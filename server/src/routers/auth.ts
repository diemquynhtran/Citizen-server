import { authController } from "../controllers/auth";

const express = require("express");
const router = express.Router();

router.post("/login", authController.login);
export default router;
