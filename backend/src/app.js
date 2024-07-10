import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser"
import userRouter from "./routes/user.route.js"
import blogRouter from "./routes/blog.route.js";
import doubtRouter from "./routes/doubt.route.js"

import practiceRouter from "./routes/practice.route.js"

const app = express();
const corsOption = {
    origin:"http://localhost:3000",
    credentials:true,
}
app.use(cors(corsOption));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static("./public/temp"));

//routes

app.use("/api/v1/user",userRouter)
app.use("/api/v1/blog",blogRouter)
app.use("/api/v1/doubt",doubtRouter);
app.use("/practice",practiceRouter)

export default app;