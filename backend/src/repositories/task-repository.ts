import prisma from "../orm/prisma";
import NewTaskData from "../types/new-task-data";
import UpdateTaskData from "../types/update-task-data";

export async function create(data: NewTaskData) {
  return await prisma.tasks.create({
    data,
  });
}

export async function findAllByUserId(userId: number) {
  return await prisma.tasks.findMany({
    where: {
      userId,
    },
  });
}

export async function update(id: number, userId: number, data: UpdateTaskData) {
  return await prisma.tasks.update({
    where: {
      id,
      userId,
    },
    data,
  });
}

export async function remove(id: number, userId: number) {
  await prisma.tasks.delete({
    where: {
      id,
      userId,
    },
  });
}
