
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { initializeApp, getApps, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
  : null;
const User = require("../models/User");

const router = express.Router();

// Initialize Firebase 
if (getApps().length === 0 && serviceAccount) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const createToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
});

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must contain at least 6 characters.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ email: normalizedEmail });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      authProvider: "local",
    });

    return res.status(201).json({
      message: "Account created successfully.",
      token: createToken(user),
      user: publicUser(user),
    });
  } catch (error) {
    console.error("Signup error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    return res.status(500).json({ message: "Unable to create account." });
  }
});

// EMAIL/PASSWORD LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (
      !user ||
      !user.password ||
      !(await bcrypt.compare(password, user.password))
    ) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    return res.json({
      message: "Login successful.",
      token: createToken(user),
      user: publicUser(user),
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Unable to log in." });
  }
});

// GOOGLE/FIREBASE LOGIN
router.post("/google", async (req, res) => {
  try {
      if (!getApps().length) {
    return res.status(503).json({
      message: "Google login is not configured on the server.",
    });
  }
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        message: "Firebase ID token is required.",
      });
    }

    const decodedToken = await getAuth().verifyIdToken(idToken);

    if (
      !decodedToken.uid ||
      !decodedToken.email ||
      !decodedToken.email_verified
    ) {
      return res.status(401).json({
        message: "A verified Google email is required.",
      });
    }

    const email = decodedToken.email.trim().toLowerCase();
    const firebaseUid = decodedToken.uid;

    let user = await User.findOne({ firebaseUid });

    if (!user) {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        // Do not automatically link an existing password account.
        if (existingUser.authProvider !== "google") {
          return res.status(409).json({
            message:
              "An account with this email already exists. Please log in with your password first.",
          });
        }

        existingUser.firebaseUid = firebaseUid;
        await existingUser.save();
        user = existingUser;
      } else {
        user = await User.create({
          name: decodedToken.name?.trim() || email.split("@")[0],
          email,
          authProvider: "email",
          firebaseUid,
        });
      }
    }

    return res.json({
      message: "Email id successful.",
      token: createToken(user),
      user: publicUser(user),
    });
  } catch (error) {
    console.error("Email id error:", error);

    if (
      error.code === "auth/argument-error" ||
      error.code === "auth/id-token-expired" ||
      error.code === "auth/invalid-id-token" ||
      error.code === "auth/invalid-credential"
    ) {
      return res.status(401).json({
        message: "Email id is invalid or expired. Please try again.",
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        message: "This account already exists. Please try signing in again.",
      });
    }

    return res.status(500).json({
      message: "Unable to complete the login.",
    });
  }
});

module.exports = router;
