import jwt from "jsonwebtoken";
import { get, create, update, remove } from "../controllers/tasks-controller.js";

const tasksRoutes = (app) => {
  app.get("/tasks", checkUserAuthentication, get);
  app.post("/tasks/create", checkUserAuthentication, create);
  app.put("/tasks/update", checkUserAuthentication, update);
  app.delete("/tasks/delete", checkUserAuthentication, remove);
};

function checkUserAuthentication(request, response, next) {
  if (!request.headers.authorization) {
    return response.status(401).send("User is not authenticated.");
  }

  const token = request.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return response.status(401).send("Invalid token.");
    }

    request.body = { ...request.body, userId: user.id };
    next();
  });
}

export default tasksRoutes;
