const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: true,
      minlength:6
    },
    role: {
      type: String,
      enum: ["admin", "member", "guest"],
      default: "member",
    },
  },
  { timestamps: true }
);
userSchema.index({ email: 1 });

module.exports = mongoose.model('User', userSchema);