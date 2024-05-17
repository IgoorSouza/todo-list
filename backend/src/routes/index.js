import usersRoutes from "./users-routes.js";
import tasksRoutes from "./tasks-routes.js";

const routes = (app) => {
  usersRoutes(app);
  tasksRoutes(app);
};

export default routes;