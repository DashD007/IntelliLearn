import { Router } from "express";
import { add, create,get } from "../controllers/practice.controller.js";

const router = Router();

router.route("/create").post(create);
router.route("/add/:commentId").post(add)
router.route("/get/:id").get(get)
export default router;