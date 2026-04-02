import exp from "express";
import { authenticate } from "../services/authService.js";
import { UserTypeModel } from "../Models/UserModel.js";
import bcrypt from "bcryptjs";
import { verifyToken } from "../middlewares/verifyToken.js";

export const commonRouter = exp.Router();

commonRouter.post("/login", async (req, res, next) => {
  try {
    const userCred = req.body;
    const { token, user } = await authenticate(userCred);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({ message: "login success", payload: user });
  } catch (err) {
    next(err);
  }
});

commonRouter.get("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

commonRouter.put("/change-password", verifyToken("USER", "AUTHOR", "ADMIN"), async (req, res, next) => {
  try {
    const { email, currentPassword, newPassword } = req.body;

    if (currentPassword === newPassword) {
      return res.status(400).json({ message: "newPassword must be different from currentPassword" });
    }

    if (email !== req.user.email) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const account = await UserTypeModel.findOne({ email });
    if (!account) {
      return res.status(404).json({ message: "Account not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, account.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    account.password = await bcrypt.hash(newPassword, 10);
    await account.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    next(err);
  }
});

commonRouter.get("/check-auth", verifyToken("USER", "AUTHOR", "ADMIN"), (req, res) => {
  res.status(200).json({ message: "authenticated", payload: req.user });
});