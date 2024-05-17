import prisma from "../services/prisma.js";

export async function createTask(data) {
  return await prisma.tasks.create({
    data,
    select: {
      title: true,
      description: true,
      done: true,
      createdAt: true,
    },
  });
}

export async function getTasks(userId) {
  return await prisma.tasks.findMany({
    where: {
      userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      done: true,
      createdAt: true,
      updatedAt: true,
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
    select: {
      title: true,
      description: true,
      done: true,
      createdAt: true,
      updatedAt: true,
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