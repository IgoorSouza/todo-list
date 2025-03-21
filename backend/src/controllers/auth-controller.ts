import { Request, Response } from "express";
import * as authService from "../services/auth-service";

export async function register(request: Request, response: Response) {
  try {
    const userData = request.body;
    const user = await authService.createNewAccount(userData);

    response.status(201).send(user);
  } catch (error: any) {
    if (error.code === "P2002") {
      return response.status(409).send("Informed email already exists.");
    }

    console.error(error);
    response.status(500).send("Unexpected error.");
  }
}

export async function login(request: Request, response: Response) {
  try {
    const credentials = request.body;
    const { name, token } = await authService.authenticate(credentials);

    response.status(200).send({ name, token });
  } catch (error: any) {
    if (error.message === "User does not exist.") {
      return response.status(404).send(error.message);
    }

    if (error.message === "Wrong password.") {
      return response.status(401).send(error.message);
    } 

    console.error(error);
    response.status(500).send("Unexpected error.");
  }
}
