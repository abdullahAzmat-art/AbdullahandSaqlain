import e from "express";
import { deleteUser, forgotPassword, getAllUsers, loginUser, registerUser, resetPassword, switchRole, uploads } from "../Controllers/Usercontroller.js";
import { authmiddleware, authorization } from "../Middleware/authmiddleware.js";
let userRouter  = e.Router();

userRouter.post("/signup"  ,  uploads.single("resume") ,registerUser)
userRouter.post("/login" , loginUser)
userRouter.put("/swithuser" ,  authmiddleware , switchRole)
userRouter.get("/getuser" , authmiddleware, authorization , getAllUsers )

userRouter.delete("/deleteuser" ,deleteUser)


userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);


export default userRouter