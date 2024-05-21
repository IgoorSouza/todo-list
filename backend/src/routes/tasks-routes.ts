import { Application, Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { get, create, update, remove } from "../controllers/tasks-controller";

declare module "jsonwebtoken" {
  export interface UserJwtPayload extends JwtPayload {
    id: number;
    name: string;
    email: string;
    password: string;
  }
}

const secret: Secret = process.env.JWT_SECRET ?? Math.random().toString(36);

const tasksRoutes = (app: Application) => {
  app.get("/tasks", checkUserAuthentication, get);
  app.post("/tasks/create", checkUserAuthentication, create);
  app.put("/tasks/update", checkUserAuthentication, update);
  app.delete("/tasks/delete", checkUserAuthentication, remove);
};

function checkUserAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (!request.headers.authorization) {
    return response.status(401).send("User is not authenticated.");
  }

  const token = request.headers.authorization.split(" ")[1];
  try {
    const user = <jwt.UserJwtPayload>jwt.verify(token, secret);
    request.body = { ...request.body, userId: user.id };
    next();
  } catch (error) {
    return response.status(401).send("Invalid token.");
  }
}

export default tasksRoutes;
