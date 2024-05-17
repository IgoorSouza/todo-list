import { register, login } from "../controllers/users-controller.js";

const usersRoutes = (app) => {
  app.post("/users/create", register);
  app.post("/users/login", login);
};

export default usersRoutes;