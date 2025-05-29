import mongoose from "mongoose";

export const connectToDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI!;
    await mongoose.connect(mongoUri);
    console.log("✅ MongoDB conectado com sucesso");
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB:", error);
    process.exit(1); // Encerra a aplicação se não conectar
  }
};
