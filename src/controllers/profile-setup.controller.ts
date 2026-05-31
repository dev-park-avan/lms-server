import { HTTPSTATUS } from "../config/http.config.js";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import { studentProfileSetupService } from "../services/profile-setup.service.js";
import { StudentProfileSetupValidation } from "../validations/profile-setup.validation.js";

const studentProfileSetupController = asyncHandler(async (req, res, next) => {
  const userId = req.user?.id;

  const body = StudentProfileSetupValidation.parse(req.body);

  const studentProfile = await studentProfileSetupService(body, userId);

  return res
    .status(HTTPSTATUS.OK)
    .json({ message: "Student profile setup successful", studentProfile });
});

export { studentProfileSetupController };
