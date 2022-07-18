import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/authController.js";
import { 
    validateAuthSchema, validateSignInData, validateSignUpData, authorization 
} from "../middlewares/authMiddleware.js";

const authRouter = Router();

authRouter.post("/signup", validateAuthSchema, validateSignUpData, signUp);
authRouter.post("/signin", validateAuthSchema, validateSignInData, signIn);
authRouter.delete("/signout", authorization, signOut);

export default authRouter;