import {Router} from "express";
import { upload } from "../middleware/multer.middleware.js";
import verifyJWT from "../middleware/auth.middleware.js";
import { getAllBlogsOfUser, getBlogById, getBlogs, writeBlog } from "../controllers/blog.controller.js";
const router = Router();

router.route("/create").post(verifyJWT,upload.single("banner"),writeBlog);
router.route("/getAll").get(getBlogs)
router.route("/get/:id").get(getBlogById);
router.route("/get/user/:userId").get(getAllBlogsOfUser);
export default router;
