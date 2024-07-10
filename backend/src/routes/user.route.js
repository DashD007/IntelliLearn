import {Router} from "express"
import { loginUser, logoutUser, registerUser, updateUserAvatar,updateAbout } from "../controllers/user.controller.js";
import verifyJWT from "../middleware/auth.middleware.js"
import {upload} from "../middleware/multer.middleware.js"
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").patch(verifyJWT,logoutUser);
router.route("/update/avatar").patch(verifyJWT,upload.single('avatar'),updateUserAvatar);
router.route("/update/about").patch(verifyJWT,updateAbout)
export default router;
