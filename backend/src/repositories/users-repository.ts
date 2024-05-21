import prisma from "../services/prisma";

interface User {
  name: string;
  email: string;
  password: string;
}

export async function createUser(user: User) {
  return await prisma.user.create({
    data: user,
    select: {
      name: true,
      email: true,
    },
  });
}

export async function getUser(userEmail: string) {
  return await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
}
