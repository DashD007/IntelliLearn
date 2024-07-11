import dotenv from "dotenv"
import app from "./src/app.js";
import connectDB from "./src/database/database.js";

dotenv.config({
    path:".env",
});

connectDB()
.then(()=>{
    app.listen(process.env.PORT, ()=> {
    console.log("server is listening on PORT", process.env.PORT)
})})
.catch((error) => console.log(error));
