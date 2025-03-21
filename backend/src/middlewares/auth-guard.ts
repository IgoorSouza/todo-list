import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";

const secret: Secret = process.env.JWT_SECRET!;

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export default function checkUserAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).send("User is not authenticated.");
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const user = jwt.verify(token, secret) as {
      id: number;
      name: string;
      email: string;
      password: string;
    };

    request.userId = user.id;
    next();
  } catch (error) {
    return response.status(401).send("Invalid token.");
  }
}
