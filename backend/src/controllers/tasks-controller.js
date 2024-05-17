import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../repositories/tasks-repository.js";
import {
  createValidation,
  updateValidation,
  removeValidation,
} from "../validations/tasks-validation.js";

export async function get(request, response) {
  try {
    const tasks = await getTasks(request.body.userId);

    response.status(200).send(tasks);
  } catch (error) {
    response.status(400).send(error);
  }
}

export async function create(request, response) {
  try {
    await createValidation.validate(request.body);

    const task = await createTask(request.body);

    response.status(201).send(task);
  } catch (error) {
    response.status(400).send(error);
  }
}

export async function update(request, response) {
  try {
    await updateValidation.validate(request.body);

    const task = await updateTask(request.body);

    response.status(200).send(task);
  } catch (error) {
    response.status(400).send(error);
  }
}

export async function remove(request, response) {
  try {
    await removeValidation.validate(request.body);

    await deleteTask(request.body);

    response.status(204).send("Task successfully deleted.");
  } catch (error) {
    response.status(400).send(error);
  }
}