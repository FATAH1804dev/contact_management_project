import express from "express";
import { publicRouter } from "../router/api-public.js";
import { errorMiddleware } from "../middleware/middleware-error.js";
import { userRouter } from "../router/api.js";
import cors from "cors";

export const web = express();
web.use(express.json());
web.use(cors());

web.use(publicRouter);
web.use(userRouter);

web.use(errorMiddleware);
