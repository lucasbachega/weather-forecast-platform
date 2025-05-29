import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("✅ MongoDB conectado");
    app.listen(PORT, () =>
      console.log(`🚀 Backend rodando em http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("❌ Erro ao conectar no MongoDB:", err));
