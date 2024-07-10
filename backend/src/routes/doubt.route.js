import {Router} from "express";
import verifyJWT from "../middleware/auth.middleware.js"
import {createDoubt, deleteReply, getAllDoubts} from "../controllers/doubt.controller.js";
import { addReply } from "../controllers/doubt.controller.js";
import { getDoubtTree } from "../controllers/doubt.controller.js";
const router = Router();

router.route("/create").post(verifyJWT,createDoubt);
router.route("/add/:id").post(verifyJWT,addReply);
router.route("/get").get(getAllDoubts)
router.route("/get/:doubtId").get(getDoubtTree);
router.route("/delete/:replyId").patch(verifyJWT,deleteReply);

export default router;