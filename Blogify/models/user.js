const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const { generateToken } = require("../service/auth");
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    profileUrl: {
      type: String,
      default: "img/default-profile.jpg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");
  this.salt = salt;
  this.password = hashedPassword;
  next();
});

userSchema.static(
  "checkPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
      console.log("not found");
      throw new Error("No User Found");
    }

    const hashedPassword = user.password;
    const salt = user.salt;
    const enteredHashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    if (enteredHashedPassword !== hashedPassword) {
      throw new Error("Incorrect Password");
    }
    return generateToken(user);
  }
);

const User = model("users", userSchema);

module.exports = User;
