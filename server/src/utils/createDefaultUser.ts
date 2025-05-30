import bcrypt from "bcryptjs";
import { User } from "../models/User";

// Função utilizada para criar um usuário padrão na app

export async function createDefaultUser() {
  const existing = await User.findOne({ email: "admin@email.com" });
  if (existing) return;

  const hashed = await bcrypt.hash("senha123", 10);

  await User.create({
    name: "Admin",
    email: "admin@email.com",
    password: hashed,
  });

  console.log("✅ Usuário padrão criado");
}
