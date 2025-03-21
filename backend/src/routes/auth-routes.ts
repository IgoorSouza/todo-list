import { Express } from "express";
import * as authController from "../controllers/auth-controller";
import validateRequestBody from "../middlewares/request-body-validator";
import { loginValidation, registerValidation } from "../validations/auth";

const authRoutes = (app: Express) => {
  app.post("/auth", validateRequestBody(loginValidation), authController.login);
  app.post(
    "/auth/register",
    validateRequestBody(registerValidation),
    authController.register
  );
};

export default authRoutes;
