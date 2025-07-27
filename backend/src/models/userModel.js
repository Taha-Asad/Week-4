import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide your full name"],
      minlength: [3, "The name must be atleast 3 chracters long"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Please provide a valid email"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    profilePic: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      trim: true,
      minlength: [6, "password must be at least of 6 chracters"],
    //   match: [
    //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    //     "Password must be minimum 6 characters, include at least one uppercase letter, one lowercase letter, one number and one special character",
    //   ],
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
export default User;
