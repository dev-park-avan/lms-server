import { HTTPSTATUS } from "../config/http.config.js";
import { asyncHandler } from "../middlewares/asyncHandler.middleware.js";
import { contactUsService } from "../services/contact-us.service.js";
import { NotFoundException } from "../utils/app-error.js";
import { contactUsSchema } from "../validations/contact-us.validation.js";

export const contactUsController = asyncHandler(async (req, res, next) => {
  const body = contactUsSchema.parse(req.body);
  //
  //   const {} =

  if (!body) {
    throw new NotFoundException("kd");
  }
  await contactUsService(body);

  res.status(HTTPSTATUS.CREATED).json({
    success: true,
    message: "Your message has been received.",
  });
});
