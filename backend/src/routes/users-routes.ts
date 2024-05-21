import { Application } from "express";
import { register, login } from "../controllers/users-controller";

const usersRoutes = (app: Application) => {
  app.post("/users/create", register);
  app.post("/users/login", login);
};

export default usersRoutes;