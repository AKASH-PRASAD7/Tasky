import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema, model, models } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, min: 5, max: 20 },
    password: { type: String, required: true, min: 8, max: 15 },
    tasks: [{ type: mongoose.Types.ObjectId, ref: "tasks" }],
  },
  {
    timestamps: true,
  }
);

//method
UserSchema.methods.genrateJwtToken = function () {
  try {
    return jwt.sign({ user: this._id.toString() }, process.env.SECRET_KEY);
  } catch (error) {
    return error;
  }
};
//statics
UserSchema.statics.findEmail = async (email) => {
  const user = await UserModel.findOne({ email });
  if (user) {
    throw new Error("User with this Email already exists...");
  }
  return false;
};

UserSchema.statics.signInUser = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });
  if (user) {
    if (await bcrypt.compare(password, user.password)) {
      const token = user.genrateJwtToken();
      return { token, name: user.name };
    } else {
      throw new Error("Invalid login details");
    }
  } else {
    throw new Error("No account found with this email");
  }
};

UserSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    } else {
      next();
    }
  } catch (e) {
    return e;
  }
});

const UserModel = models.users || model("users", UserSchema);
export default UserModel;
