import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/authController.js";
import { authorization } from "../middlewares/authMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchema.js";
import { authSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/signup", validateSchemaMiddleware(authSchema), signUp);
authRouter.post("/signin", validateSchemaMiddleware(authSchema), signIn);
authRouter.delete("/signout", authorization, signOut);

export default authRouter;