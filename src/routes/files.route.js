import { Router } from "express";
import { authMiddleware } from "../middlewares";
import { multer } from "../multer";
import { fileController } from "../controllers";
import { validateDeleteFile } from "../validators/file";

const router = Router();

router.use(authMiddleware);

router.post("/", multer().single("file"), fileController.uploadFile);
router.delete("/:id", validateDeleteFile, fileController.deleteFile);

export { router as fileRouter };
export default router;
