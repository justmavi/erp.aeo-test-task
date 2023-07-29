import { Router } from "express";
import { authMiddleware } from "../middlewares";
import { uploadFile } from "../multer";
import { fileController } from "../controllers";
import {
  validateDeleteFile,
  validateGetFiles,
  validateGetFile,
  validateDownloadFile,
  validateUpdateFile,
} from "../validators";

const router = Router();

router.use(authMiddleware);

router.post("/", uploadFile(), fileController.uploadFile);
router.delete("/:id", validateDeleteFile, fileController.deleteFile);
router.get("/", validateGetFiles, fileController.getFiles);
router.get("/:id", validateGetFile, fileController.getFileById);
router.post("/download/:id", validateDownloadFile, fileController.downloadFile);
router.put("/:id", validateUpdateFile, uploadFile(), fileController.updateFile);

export { router as fileRouter };
export default router;
