import { Router } from "express";
import { authMiddleware } from "../middlewares";
import { multer } from "../multer";
import { fileController } from "../controllers";

const router = Router();

router.post(
  "/upload",
  authMiddleware,
  multer().single("file"),
  fileController.uploadFile
);

export { router as fileRouter };
export default router;
