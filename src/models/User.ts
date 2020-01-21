import mongoose from "mongoose";

interface IUserModel extends mongoose.Document {
  username: string;
  email?: string;
  name?: string;
  password?: string;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username field is required"],
    unique: true,
    maxlength: [50, "Username must be less than 50 chars long"]
  }
});

const User = mongoose.model<IUserModel>("User", userSchema);

module.exports = User;
