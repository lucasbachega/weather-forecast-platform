import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import request from "supertest";
import { connectToDatabase } from "../config/database";
import { User } from "../models/User";
import router from "../routes";

dotenv.config();

const app = express();
app.use(express.json());
app.use("/api", router);

let token: string;

beforeAll(async () => {
  await connectToDatabase();

  const email = "test@email.com";
  const password = "senha123";

  await User.deleteOne({ email });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name: "Teste", email, password: hashed });

  token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
});

describe("Weather routes", () => {
  it("deve salvar a busca no histórico após buscar uma cidade", async () => {
    const res = await request(app)
      .get("/api/weather/city/São Paulo")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});
