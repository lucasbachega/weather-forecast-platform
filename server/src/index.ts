import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectToDatabase } from "./config/database";
import routes from "./routes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: /localhost/,
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use("/api", routes);

const PORT = process.env.PORT || 5000;

connectToDatabase().then(() => {
  app.listen(PORT, () =>
    console.log(`✅ Backend rodando em http://localhost:${PORT}`)
  );
});
