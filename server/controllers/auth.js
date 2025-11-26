
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// =============================
//  Sign Up
// =============================

export const signUp = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    // check email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const err = new Error("Email already exists.");
      err.statusCode = 400;
      return next(err);
    }

    //  bycrypt passwaord
    const hashedPassword = await bcrypt.hash(password, 10);

    //  adimn eamill
    const ADMIN_EMAIL = "test@example.com"; 

    //  check user is admin
    if (role === "admin" && email !== ADMIN_EMAIL) {
      const err = new Error("You can only register as a regular user.");
      err.statusCode = 403;
      return next(err);
    }

    //  align role
    const userRole = email === ADMIN_EMAIL ? "admin" : "user";

    //  creat new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });

    //  reuslt 
    res.status(201).json({
      ok: true,
      message:
        userRole === "admin"
          ? "admin registered successfully."
          : "user registered successfully.",
      data: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (err) {
    next(err);
  }
};


// =============================
//  Sign In
// =============================
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // find user
    const user = await User.findOne({ email });
    if (!user) {
      const err = new Error("User not found");
      err.statusCode = 401;
      return next(err);
    }

    // 2️verify passswaord
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const err = new Error("Incorrect password");
      err.statusCode = 401;
      return next(err);
    }

    //  JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: process.env.JWT_EXPIRES || "1d" }
    );

    //  return respon success
    res.status(200).json({
      ok: true,
      token,
      role: user.role,
      message: "Login successful",
    });
  } catch (err) {
    next(err);
  }
};

// =============================
//  Sign Out
// =============================
export const signOut = (req, res) => {
  // Token .log out delelet
  res.json({
    ok: true,
    message: "Signed out successfully. Token cleared on client side.",
  });
};

