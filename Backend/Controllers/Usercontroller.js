import User from "../Models/Userschema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import crypto from "crypto";
import nodemailer from "nodemailer";

// 📂 Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

export const uploads = multer({ storage, fileFilter });

// 🧠 Register user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, bio, skills, interests  , preferredCategory} = req.body;

    // ✅ Required fields validation (fixed)
    const checkinput = ["name", "email", "password", "bio", "skills", "interests" , "preferredCateory"];
    for (let input of checkinput) {
      if (!req.body[input]) {
        return res.status(400).send({ message: `${input} is required` });
      }
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // parse arrays
    const parsedSkills = skills ? JSON.parse(skills) : [];
    const parsedInterests = interests ? JSON.parse(interests) : [];

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      bio,
      skills: parsedSkills,
      interests: parsedInterests,
      resume: req.file ? req.file.path : "",
      preferredCategory
    });

    res.status(201).json({ msg: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    const requiredFields = ["email", "password"];
    for (let field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ msg: `${field} is required` });
      }
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // ✅ Wait for bcrypt to compare
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    // ✅ Sign real token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send response
    res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// 🔄 Switch role
export const switchRole = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.role = user.role === "creator" ? "seeker" : "creator";
    await user.save();
    res.json({ msg: "Role switched", role: user.role });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const changeUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["admin", "creator", "seeker"].includes(role)) {
      return res.status(400).json({ msg: "Invalid role type" });
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    res.status(200).json({ msg: "User role updated", user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    // Email configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    const mailOptions = {
      from: "YourApp <no-reply@yourapp.com>",
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset. Click below link to reset:</p>
             <a href="${resetLink}">${resetLink}</a>`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = newPassword; // will be hashed in pre-save
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password has been reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password" });
  }
};


export const recommendJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const allJobs = await Job.find();

    // Filter jobs that match user's skills or category
    const recommended = allJobs.filter(job => {
      const matchSkill = job.skills.some(skill => user.skills.includes(skill));
      const matchCategory = job.category === user.preferredCategory;
      return matchSkill || matchCategory;
    });

    res.status(200).json(recommended);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
