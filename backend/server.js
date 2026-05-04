import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import dns from "dns";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';






dns.setServers(["1.1.1.1", "8.8.8.8"]);



dotenv.config();
connectDB();


const app = express();

// middleware

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: [
    process.env.CLIENT_URL,
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176'
  ].filter(Boolean),
  credentials: true,    // Cookie allow karo
}));






// // test route
app.use('/api/auth' , authRoutes);
app.use('/api/company' , companyRoutes);
app.use('/api/job' , jobRoutes);
app.use('/api/application', applicationRoutes);




app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Job Portal API is running...',
    success: true,
  });
});


app.use(notFound);
app.use(errorHandler);

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Mode: ${process.env.NODE_ENV}`);
});


