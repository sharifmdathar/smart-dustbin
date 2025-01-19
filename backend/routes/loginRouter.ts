import express, { Request, Response } from "express";
import User from "../models/user.ts";
const loginRouter = express.Router();

loginRouter.post("/", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    if (password === user.password) {
      res.status(200).send(user);
    } else {
      res.status(401).send({ error: "Incorrect Password" });
    }
  } else {
    res.status(401).send({ error: "User not found" });
  }
});

export default loginRouter;
