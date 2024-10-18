import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from './routes/userRoute.js';
import authRouter from './routes/authRoute.js';
import listingRouter from './routes/listingRoute.js';
import path from 'path';
const app=express();
// const corsOptions = {
//   origin: "http://localhost:5173", 
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],}
// app.use(cors(corsOptions));
// app.use((req, res, next) => {
//   res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
//   res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
//   next();
// });
dotenv.config();

mongoose.connect(process.env.DB)
.then(()=>{console.log("connected to db")})
.catch((err)=>{console.log(err)})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use('/api/listing', listingRouter);



app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
    console.log(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });

app.listen(3000,()=>{
    console.log("Server is ruinning on port 3000!")
})