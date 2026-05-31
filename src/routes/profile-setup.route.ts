import { Router } from "express";
import { studentProfileSetupController } from "../controllers/profile-setup.controller.js";

const profileSetupRoutes = Router();

profileSetupRoutes.post("/student", studentProfileSetupController);

export default profileSetupRoutes;
