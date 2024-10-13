import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
const app=express();
dotenv.config();

mongoose.connect(process.env.DB)
.then(()=>{console.log("connected to db")})
.catch((err)=>{console.log(err)})

app.listen(3000,()=>{
    console.log("Server is ruinning on port 3000!")
})