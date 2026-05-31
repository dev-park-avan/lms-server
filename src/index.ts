import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import passport from "passport";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import "./config/passport.config.js";
import courseRoutes from "./routes/course.route.js";
import { isAuthenticated } from "./middlewares/isAuthenticated.middleware.js";
import userRoutes from "./routes/user.routes.js";
import paymentRoutes from "./routes/payment.route.js";
import enrollmentRoutes from "./routes/enrollment.route.js";
import contactUsRoute from "./routes/contact-us.route.js";
import profileSetupRoutes from "./routes/profile-setup.route.js";
import cloudinaryRoutes from "./routes/cloudinary-uploads.route.js";
// import sectionRoutes from "./routes/section.route";
// import lectureRoutes from "./routes/lecture.route";
import { config } from "./config/app.config.js";
import instructorCourseRoutes from "./routes/instructor-course.route.js";
// import lectureRoutes from "./routes/lecture.route";

console.log("🔥 NEW CODE RUNNING 🔥");

const app = express();

const allowedOrigins = [config.LOCAL_FRONTEND_ORIGIN, config.FRONTEND_ORIGIN];

// app.use(
//   cors({
//     origin: (origin, cb) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         cb(null, true);
//       } else {
//         cb(new Error("CORS blocked: " + origin));
//       }
//     },
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: allowedOrigins, // 👈 your deployed frontend
    credentials: true, // 👈 critical for cookies
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(cookieParser());

// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Passport initialization
app.use(passport.initialize());

app.get(`${config.BASE_PATH}/ping`, (req, res) => {
  res.status(200).json({ message: "pong" });
});

app.get(`${config.BASE_PATH}/health`, (req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.use(`${config.BASE_PATH}/auth`, authRoutes);

app.use(
  `${config.BASE_PATH}/profile-setup`,
  isAuthenticated,
  profileSetupRoutes,
);

app.use(`${config.BASE_PATH}/user`, isAuthenticated, userRoutes);

app.use(`${config.BASE_PATH}/courses`, courseRoutes);

app.use(
  `${config.BASE_PATH}/instructor`,
  isAuthenticated,
  instructorCourseRoutes,
);

// app.use(
//   `${config.BASE_PATH}/instructor`,
//   isAuthenticated,
//   instructorSectionRoutes,
// );

// app.use(`${config.BASE_PATH}/section`, sectionRoutes);

// app.use(`${config.BASE_PATH}/lectures`, lectureRoutes);

app.use(`${config.BASE_PATH}/payment`, isAuthenticated, paymentRoutes);

app.use(`${config.BASE_PATH}/enrollments`, isAuthenticated, enrollmentRoutes);

app.use(`${config.BASE_PATH}/contact-us`, contactUsRoute);

app.use(`${config.BASE_PATH}`, cloudinaryRoutes);

app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(
    `✅ Server is listening on port ${config.PORT} in ${config.NODE_ENV} http://localhost:${config.PORT}`,
  );
});
