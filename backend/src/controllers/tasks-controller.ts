import { Request, Response } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../repositories/tasks-repository";
import {
  createValidation,
  updateValidation,
  removeValidation,
} from "../validations/tasks-validation";

export async function get(request: Request, response: Response) {
  try {
    const tasks = await getTasks(request.body.userId);

    response.status(200).send(tasks);
  } catch (error) {
    response.status(400).send(error);
  }
}

export async function create(request: Request, response: Response) {
  try {
    createValidation.parse(request.body);

    const task = await createTask(request.body);

    response.status(201).send(task);
  } catch (error) {
    response.status(400).send(error);
  }
}

export async function update(request: Request, response: Response) {
  try {
    updateValidation.parse(request.body);

    const task = await updateTask(request.body);

    response.status(200).send(task);
  } catch (error) {
    response.status(400).send(error);
  }
}

export async function remove(request: Request, response: Response) {
  try {
    removeValidation.parse(request.body);

    await deleteTask(request.body);

    response.status(204).send("Task successfully deleted.");
  } catch (error) {
    response.status(400).send(error);
  }
}
