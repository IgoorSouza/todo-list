import prisma from "../orm/prisma";
import NewUserData from "../types/new-user-data";

export async function create(data: NewUserData) {
  return await prisma.user.create({
    data,
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}

export async function findByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}
