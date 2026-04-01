import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserTypeModel } from "../Models/UserModel.js";
import { config } from "dotenv";

config();

export const register = async (userObj) => {
  const userDoc = new UserTypeModel(userObj);
  await userDoc.validate();
  userDoc.password = await bcrypt.hash(userDoc.password, 10);
  const created = await userDoc.save();
  const newUserObj = created.toObject();
  delete newUserObj.password;
  return newUserObj;
};

export const authenticate = async ({ email, password }) => {
  const user = await UserTypeModel.findOne({ email });
  if (!user) {
    const err = new Error("Invalid email");
    err.status = 401;
    throw err;
  }

  if (user.isActive === false) {
    const err = new Error("Your account is blocked. Please contact admin");
    err.status = 403;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error("Invalid password");
    err.status = 401;
    throw err;
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role, email: user.email, firstName: user.firstName, profileImageUrl: user.profileImageUrl },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  const userObj = user.toObject();
  delete userObj.password;

  return { token, user: userObj };
};
