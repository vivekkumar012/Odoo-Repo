import express from 'express'
import userRouter from './routes/userRoute.js';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import categoryRouter from './routes/categoryRoute.js';
import cors from 'cors'

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",  // your frontend Vite port
  credentials: true                 // allow cookies/auth headers
}));

try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database is connected")
} catch (error) {
    console.log("Error in database", error);
}

app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', userRouter);
app.use('/api/v1/product', categoryRouter);


const port = 3001;

app.listen(port, () => {
    console.log(`app is listening on ${port}`);
})

