import { Router } from "express";
import { AuthController } from "./authController";
import imageUpload from "../../helpers/imageUpload";
const router: Router = Router();
const authController = new AuthController();

router.post("/register", imageUpload.single("file"), authController.register);

export const AuthRoute: Router = router;
