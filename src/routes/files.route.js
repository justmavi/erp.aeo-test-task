import { Router } from "express";
import { authMiddleware } from "../middlewares";
import { multer } from "../multer";
import { fileController } from "../controllers";
import {
  validateDeleteFile,
  validateGetFiles,
  validateGetFile,
  validateDownloadFile,
} from "../validators";

const router = Router();

router.use(authMiddleware);

router.post("/", multer().single("file"), fileController.uploadFile);
router.delete("/:id", validateDeleteFile, fileController.deleteFile);
router.get("/", validateGetFiles, fileController.getFiles);
router.get("/:id", validateGetFile, fileController.getFileById);
router.post("/download/:id", validateDownloadFile, fileController.downloadFile);

export { router as fileRouter };
export default router;
