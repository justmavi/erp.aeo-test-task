import { Router } from "express";
import { userController } from "../controllers";

const router = Router();

router.get("/signin/new_token");
router.post("/signin", userController.login);
router.post("/signup", userController.register);
router.get("/info", userController.getUserInfo);
