import { Application } from "express";
import usersRoutes from "./users-routes";
import tasksRoutes from "./tasks-routes";

const routes = (app: Application) => {
  usersRoutes(app);
  tasksRoutes(app);
};

export default routes;