import { userController } from "../controllers/user";

const express = require("express");
const router = express.Router();

router.get("/", userController.getUser);
export default router;
