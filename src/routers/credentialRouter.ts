import { Router } from "express";
import { createCredential, deleteCredential, getCredentialById, getCredentials } from "../controllers/credentialController.js";
import { authorization } from "../middlewares/authMiddleware.js";
import { validateCredentialSchema, validateIsCredentialUser } from "../middlewares/credentialMiddleware.js";

const credentialRouter = Router();

credentialRouter.post("/credentials", validateCredentialSchema, authorization, createCredential);
credentialRouter.get("/credentials", authorization, getCredentials);
credentialRouter.get("/credentials/:credentialId", authorization, validateIsCredentialUser,getCredentialById);
credentialRouter.delete("/credentials/:credentialId", authorization, validateIsCredentialUser, deleteCredential);

export default credentialRouter;