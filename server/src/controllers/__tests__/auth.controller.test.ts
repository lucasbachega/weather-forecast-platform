import express from "express";
import request from "supertest";
import authRoutes from "../../routes/auth.routes";
import {
  clearTestDB,
  connectTestDB,
  disconnectTestDB,
} from "../../tests/setup";

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);

beforeAll(async () => {
  await connectTestDB();
});

afterAll(async () => {
  await disconnectTestDB();
});

beforeEach(async () => {
  await clearTestDB();
});

describe("Auth Controller", () => {
  it("Deve retornar 400 se o e-mail já estiver em uso", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      name: "Lucas",
      email: "test@test.com",
      password: "123456",
    });

    // Você pode rodar duas vezes pra forçar o erro de email duplicado
    const res2 = await request(app).post("/api/auth/signup").send({
      name: "Lucas",
      email: "test@test.com",
      password: "123456",
    });

    expect(res2.statusCode).toBe(400);
    expect(res2.body.message).toBe("Email já cadastrado.");
  });
});
