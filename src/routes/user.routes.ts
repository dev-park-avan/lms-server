import { Router } from "express";
import { getCurrentUserController } from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.get("/me", getCurrentUserController);

export default userRoutes;
