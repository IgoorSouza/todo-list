import { Request, Response } from "express";
import * as taskService from "../services/task-service";

export async function getUserTasks(request: Request, response: Response) {
  try {
    const userId = request.userId!;
    const tasks = await taskService.getTasksByUserId(userId);

    response.status(200).send(tasks);
  } catch (error: any) {
    console.error(error);
    response.status(500).send("Unexpected error.");
  }
}

export async function createNewTask(request: Request, response: Response) {
  try {
    const taskData = request.body;
    const userId = request.userId!;
    const task = await taskService.createTask(taskData, userId);

    response.status(201).send(task);
  } catch (error: any) {
    console.error(error);
    response.status(500).send("Unexpected error.");
  }
}

export async function concludeTask(request: Request, response: Response) {
  try {
    const taskId = parseInt(request.params.id);
    const userId = request.userId!;
    const taskData = request.body;
    const task = await taskService.updateTask(taskId, userId, taskData);

    response.status(200).send(task);
  } catch (error: any) {
    console.error(error);
    response.status(500).send("Unexpected error.");
  }
}

export async function deleteTask(request: Request, response: Response) {
  try {
    const taskId = parseInt(request.params.id);
    const userId = request.userId!;
    await taskService.deleteTask(taskId, userId);

    response.status(200).send("Task successfully deleted.");
  } catch (error: any) {
    console.error(error);
    response.status(500).send("Unexpected error.");
  }
}
