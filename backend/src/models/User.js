import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    //không cần id vì mongodb tự tạo
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    phone: String,
    role: { type: String, default: "user" } // admin, user
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
