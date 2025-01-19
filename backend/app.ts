import express, { Request, Response } from "express";
import usersRouter from "./routes/usersRouter.ts";
import mongoose from "mongoose";
import { MONGODB_URI } from "./utils/config.ts";

const app = express();
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI);
} else {
  console.error("MONGODB_URI is not defined");
  Deno.exit(1);
}

app.use(express.json());
app.use("/api/users", usersRouter);
app.use((_req: Request, res: Response) => {
  res.send("Welcome to Smart Dustbin App");
});

export default app;
