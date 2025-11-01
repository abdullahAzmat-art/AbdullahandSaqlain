import jwt from "jsonwebtoken";

import User from "../Models/Userschema.js";


export const authmiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Token missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(404).json({ msg: "User not found" });

    req.user = user; // ✅ Attach user object to the request
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export let authorization = (req ,res ,next) => {

    if (req.user.role == "admin") {
        next();
    }else{
        res.status(400).send({message:"the access denied"})
    }
};
