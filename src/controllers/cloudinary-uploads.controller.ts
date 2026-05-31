import { generateUploadSignature } from "../config/cloudinary.config.js";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";

export const getUploadSignatureController = asyncHandler(async (req, res) => {
  const folder = (req.query.folder as string) || "LMS";
  const data = generateUploadSignature(folder);
  res.json(data);
});
