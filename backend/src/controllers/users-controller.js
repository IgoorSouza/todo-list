import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createUser, getUser } from "../repositories/users-repository.js";
import {
  registerValidation,
  loginValidation,
} from "../validations/users-validation.js";

export async function register(request, response) {
  try {
    await registerValidation.validate(request.body);

    request.body.password = await bcrypt.hash(request.body.password, 10);

    const user = await createUser(request.body);

    response.status(201).send(user);
  } catch (error) {
    if (error.code === "P2002") {
      return response.status(409).send("Informed email already exists.");
    }

    response.status(400).send(error);
  }
}

export async function login(request, response) {
  try {
    await loginValidation.validate(request.body);

    const user = await getUser(request.body.email);

    if (!user) {
      throw 404;
    }

    const matchPassword = await bcrypt.compare(
      request.body.password,
      user.password
    );

    if (!matchPassword) {
      throw 401;
    }

    const token = jwt.sign(user, process.env.JWT_SECRET);

    response.status(200).send({ name: user.name, token });
  } catch (error) {
    if (error === 404) {
      return response.status(404).send("User does not exist");
    }

    if (error === 401) {
      return response.status(401).send("Wrong password.");
    }

    response.status(400).send(error);
  }
}
