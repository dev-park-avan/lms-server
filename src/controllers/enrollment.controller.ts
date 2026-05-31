import { HTTPSTATUS } from "../config/http.config.js";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import { getEnrollmentStatusService } from "../services/enrollment.service.js";

// GET /api/courses/:courseId/enrollment-status
export const getEnrollmentStatusController = asyncHandler(async (req, res) => {
  const userId = req.user?.id;
  const { courseId } = req.params;

  if (!userId) {
    return res.json({ enrolled: false });
  }

  const courseIdValue = Array.isArray(courseId) ? courseId[0] : courseId;

  const { enrollment } = await getEnrollmentStatusService(
    userId,
    courseIdValue,
  );

  return res.status(HTTPSTATUS.OK).json({ enrolled: !!enrollment });
});
