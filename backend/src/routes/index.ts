import { Express } from "express";
import usersRoutes from "./auth-routes";
import tasksRoutes from "./tasks-routes";

const routes = (app: Express) => {
  usersRoutes(app);
  tasksRoutes(app);
};

export default routes;
