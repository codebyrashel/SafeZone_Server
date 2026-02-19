import express, { Application, NextFunction, Request, Response } from "express";
import { IndexRoutes } from "./app/routes";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", IndexRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(201).json({
    success: true,
    message: "SafeZone API running 🩺",
  });
});

app.use(globalErrorHandler)
app.use(notFound)

export default app;
