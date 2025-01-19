import express, { Request, Response } from "express";
import User from "../models/user.ts";
const usersRouter = express.Router();

usersRouter.get("/", async (_req: Request, res: Response) => {
  const allUsers = await User.find({});
  res.send(allUsers);
});

usersRouter.post("/", async (req: Request, res: Response) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.send(newUser);

    // deno-lint-ignore no-explicit-any
  } catch (error: any) {
    if (error.code === 11000) {
      res.status(400).send({ error: "Username already exists" });
    } else {
      console.log(error.message);
      res.status(400).send({ error: error.message });
    }
  }
});

usersRouter.put("/:username", async (req: Request, res: Response) => {
  const { username } = req.params;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  } else {
    const lastUpdated = new Date(user.lastUpdated);
    const now = new Date();
    const diff = now.getTime() - lastUpdated.getTime();
    if (diff < 24 * 60 * 60 * 1000) {
      return res.status(220).send({ success: false });
    } else {
      user.points += 50;
      user.lastUpdated = now;
      user.save();
      res.status(200).send({ success: true, user: user });
    }
  }
});

export default usersRouter;
