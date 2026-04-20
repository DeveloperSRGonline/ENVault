import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String }, // Null for Google-only users
    googleId: { type: String },
    avatar: { type: String },
    isPremium: { type: Boolean, default: false },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ googleId: 1 }, { sparse: true });

export default mongoose.model("User", userSchema);
