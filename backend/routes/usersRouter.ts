import express, { Request, Response } from "express";
import User from "../models/user.ts";
const usersRouter = express.Router();

usersRouter.get("/", async (_req: Request, res: Response) => {
  const allUsers = await User.find({});
  res.send(allUsers);
});

usersRouter.post("/", async (req: Request, res: Response) => {
  const user = new User(req.body);
  const newUser = await user.save();
  res.send(newUser);
});

usersRouter.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedUser = await User.findByIdAndUpdate(
    id,
    req.body,
    { new: true },
  );
  res.send(updatedUser);
});

export default usersRouter;
