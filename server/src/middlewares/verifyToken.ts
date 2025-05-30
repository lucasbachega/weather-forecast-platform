import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string;
  iat: number;
  exp: number;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const JWT_SECRET = process.env.JWT_SECRET!;
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Token ausente" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(403).json({ message: "Token inválido" });
  }
};
