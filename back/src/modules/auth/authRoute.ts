import { Router } from "express";
import { AuthController } from "./authController";
const router: Router = Router();
const authController = new AuthController();
router.get('/google-auth', authController.googleOauthHandler);
export const AuthRoute: Router = router;
