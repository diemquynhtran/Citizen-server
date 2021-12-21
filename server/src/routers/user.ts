import { userController } from "../controllers/user";

const express = require("express");
const router = express.Router();

router.get("/", userController.getUser);
router.post("/create",userController.create);
export default router;
