import prisma from "../services/prisma.js";

export async function createTask(data) {
  return await prisma.tasks.create({
    data,
  });
}

export async function getTasks(userId) {
  return await prisma.tasks.findMany({
    where: {
      userId,
    },
  });
}

export async function updateTask(task) {
  return await prisma.tasks.update({
    where: {
      id: task.id,
      userId: task.userId,
    },
    data: {
      title: task.title,
      description: task.description,
      done: task.done,
    },
  });
}

export async function deleteTask(task) {
  await prisma.tasks.delete({
    where: {
      id: task.id,
      userId: task.userId,
    },
  });
}
