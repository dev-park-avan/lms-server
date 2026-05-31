import z from "zod";
import { LectureSchema } from "./lecture.validation.js";

export const SectionSchema = z.object({
  title: z.string().min(1).optional(),
  objective: z.string().optional(),
  lectures: z.array(LectureSchema).default([]),
});
