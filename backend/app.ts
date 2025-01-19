import express, { Request, Response } from "npm:express";
import usersRouter from "./routes/usersRouter.ts";
import loginRouter from "./routes/loginRouter.ts";
import mongoose from "npm:mongoose";
import cors from "npm:cors";
import { MONGODB_URI } from "./utils/config.ts";

const app = express();
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) =>
      console.error("Error connecting to MongoDB:", error.message)
    );
} else {
  console.error("MONGODB_URI is not defined");
}

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.get("/", (_req: Request, res: Response) => {
  res.sendFile(import.meta.dirname + "/dist/index.html");
});
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use((_req: Request, res: Response) => {
  res.send("<h1>Welcome to Smart Dustbin App</h1>");
});

export default app;
