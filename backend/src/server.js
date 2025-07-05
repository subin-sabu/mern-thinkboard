import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';

import { connectDB } from './config/db.js';
import notesRoutes from "./routes/notesRoutes.js"
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001;

// middlewares
app.use(cors({
  origin: "http://localhost:5173"
}))
app.use(express.json()) // parses JSON body
app.use(rateLimiter);

// routes
app.use("/api/notes", notesRoutes);


connectDB().then(() => {
  app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
  });
});