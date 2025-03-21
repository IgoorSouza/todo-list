import jwt, { Secret } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import * as userRepository from "../repositories/user-repository";
import NewUserData from "../types/new-user-data";
import Credentials from "../types/user-credentials";

const secret: Secret = process.env.JWT_SECRET!;

export async function createNewAccount(userData: NewUserData) {
  userData.password = await bcrypt.hash(userData.password, 10);
  return await userRepository.create(userData);
}

export async function authenticate({ email, password }: Credentials) {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error("User does not exist.");

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) throw new Error("Wrong password.");

  const token = jwt.sign(user, secret);

  return { name: user.name, token };
}
