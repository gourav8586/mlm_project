const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  otp: {
    type: Number,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: String,
  },
  gender: {
    type: String,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  state: {
    type: String,
  },
  image: {
    type: String,
  },
  wallet: {
    type: Number,
  },
  auth_key: { type: String, default: null },
  user_auth: {
    type: String,
    enum: ["Blocked", "Unblocked"],
    default: "Unblocked",
  },
  role: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
  },
  addedBy: {
    type: Number,
    default: 0,
  },
  mychild: {
    type: Number,
    default: 0,
  },
  allchild: {
    type: Number,
    default: 0,
  },
  level: {
    type: Number,
    default: 0,
  },
  direction: {
    type: String,
  },
});

// Pre-save middleware to increment user_id by 1
userSchema.pre("save", async function (next) {
  try {
    if (!this.userId) {
      const lastUser = await this.constructor.findOne(
        {},
        {},
        { sort: { userId: -1 } }
      );
      if (lastUser) {
        this.userId = lastUser.userId + 1;
      } else {
        this.userId = 1;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
