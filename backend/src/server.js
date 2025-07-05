import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import path from 'path';

import { connectDB } from './config/db.js';
import notesRoutes from "./routes/notesRoutes.js"
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// we are hosting both frontend and backend in same URL using render. So, there are no seperate sources or  cross-origin
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
  origin: "http://localhost:5173"
}));
}

app.use(express.json()) // parses JSON body
app.use(rateLimiter);

// routes
app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')))

  app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
})
}

connectDB().then(() => {
  app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
  });
});