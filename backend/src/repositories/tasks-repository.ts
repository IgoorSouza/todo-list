import prisma from "../services/prisma";

interface Task {
  id: number;
  title: string;
  description: string;
  done: boolean;
  userId: number;
}

export async function createTask(task: Task) {
  return await prisma.tasks.create({
    data: task,
  });
}

export async function getTasks(userId: number) {
  return await prisma.tasks.findMany({
    where: {
      userId,
    },
  });
}

export async function updateTask(task: Task) {
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

export async function deleteTask(task: Task) {
  await prisma.tasks.delete({
    where: {
      id: task.id,
      userId: task.userId,
    },
  });
}
