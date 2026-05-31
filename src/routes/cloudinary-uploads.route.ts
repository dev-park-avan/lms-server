import { Router } from "express";
import { getUploadSignatureController } from "../controllers/cloudinary-uploads.controller.js";

const cloudinaryRoutes = Router();

cloudinaryRoutes.get("/cloudinary-signature", getUploadSignatureController);

export default cloudinaryRoutes;
