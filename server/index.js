import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { UserRouter } from "./routes/UserRoute.js"; 
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Use cookie-parser middleware
app.use(cookieParser());

// Use JSON parser middleware
app.use(express.json());

// Cors configuration for allowing credentials
const corsOptions = {
  origin: [
    'http://localhost:5173', 
    'https://aditya-mishra9670.github.io'
  ],
  credentials: true, // Important for sending cookies across origins
};

app.use(cors(corsOptions));

// Routes
app.use('/auth', UserRouter); 

// MongoDB connection
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
