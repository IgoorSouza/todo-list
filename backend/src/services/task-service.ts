import * as taskRepository from "../repositories/task-repository";
import NewTaskData from "../types/new-task-data";
import UpdateTaskData from "../types/update-task-data";

export async function getTasksByUserId(userId: number) {
  return await taskRepository.findAllByUserId(userId);
}

export async function createTask(taskData: NewTaskData, userId: number) {
  return await taskRepository.create({ ...taskData, userId });
}

export async function updateTask(
  taskId: number,
  userId: number,
  taskData: UpdateTaskData
) {
  return await taskRepository.update(taskId, userId, taskData);
}

export async function deleteTask(taskId: number, userId: number) {
  await taskRepository.remove(taskId, userId);
}
