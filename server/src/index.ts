import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectToDatabase } from "./config/database";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

connectToDatabase().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Backend rodando em http://localhost:${PORT}`)
  );
});
