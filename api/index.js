import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
const app=express();
dotenv.config();

mongoose.connect(process.env.DB)
.then(()=>{console.log("connected to db")})
.catch((err)=>{console.log(err)})

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);

app.listen(3000,()=>{
    console.log("Server is ruinning on port 3000!")
})