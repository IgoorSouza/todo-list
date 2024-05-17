import prisma from "../services/prisma.js";

export async function createUser(data) {
  return await prisma.user.create({
    data,
    select: {
      name: true,
      email: true,
    },
  });
}

export async function getUser(userEmail) {
  return await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
}