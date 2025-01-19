import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  points: {
    type: Number,
    default: 0,
  },
});

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

const User = model("User", userSchema);

export default User;
