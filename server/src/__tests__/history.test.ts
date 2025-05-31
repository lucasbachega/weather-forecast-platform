import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import request from "supertest";
import { connectToDatabase } from "../config/database";
import { SearchHistory } from "../models/SearchHistory";
import { User } from "../models/User";
import router from "../routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", router);

let token: string;

beforeAll(async () => {
  await connectToDatabase();

  const email = "test2@email.com";
  const password = "senha123";

  await User.deleteOne({ email });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    name: "Histórico",
    email,
    password: hashed,
  });

  token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  await SearchHistory.create({
    query: "Curitiba PR",
    searchedAt: new Date(),
    userId: user._id,
  });
});

describe("History routes", () => {
  it("deve retornar o histórico de buscas do usuário logado", async () => {
    const res = await request(app)
      .get("/api/history/search")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("query");
    expect(res.body[0]).toHaveProperty("searchedAt");
  });
});
