import { Router } from "express";
import { createWifi, deleteWifiById, getWifiById, getWifis } from "../controllers/wifiController.js";
import { authorization } from "../middlewares/authMiddleware.js";
import { validateIsWifiUser, validateWifiSchema } from "../middlewares/wifiMiddleware.js";

const wifiRouter = Router();

wifiRouter.post("/wifis", validateWifiSchema, authorization, createWifi);
wifiRouter.get("/wifis", authorization, getWifis);
wifiRouter.get("/wifis/:wifiId", authorization, validateIsWifiUser, getWifiById);
wifiRouter.delete("/wifis/:wifiId", authorization, validateIsWifiUser, deleteWifiById);

export default wifiRouter;