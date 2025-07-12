import express from 'express'
import userRouter from './routes/userRoute.js';
import dotenv from 'dotenv'
import mongoose from 'mongoose';

const app = express();
dotenv.config();
app.use(express.json());

try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database is connected")
} catch (error) {
    console.log("Error in database", error);
}

app.use('/api/v1/user', userRouter);


const port = 3001;

app.listen(port, () => {
    console.log(`app is listening on ${port}`);
})

