import { Express } from "express";
import * as taskController from "../controllers/task-controller";
import checkUserAuthentication from "../middlewares/auth-guard";
import validateRequestBody from "../middlewares/request-body-validator";
import { createValidation, concludeValidation } from "../validations/tasks";

const tasksRoutes = (app: Express) => {
  app.get("/tasks", checkUserAuthentication, taskController.getUserTasks);
  app.post(
    "/tasks/new",
    checkUserAuthentication,
    validateRequestBody(createValidation),
    taskController.createNewTask
  );
  app.put(
    "/tasks/:id/conclude",
    checkUserAuthentication,
    validateRequestBody(concludeValidation),
    taskController.concludeTask
  );
  app.delete(
    "/tasks/:id/delete",
    checkUserAuthentication,
    taskController.deleteTask
  );
};

export default tasksRoutes;
