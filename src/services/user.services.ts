import { User } from "@prisma/client";

import prisma from "@/utils/prisma";

export const UserServices = {
  getAllUsers: async () => {
    const users = await prisma.user.findMany();

    return users;
  },

  findUser: async (idOrEmail: string) => {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          {
            id: idOrEmail,
          },
          {
            email: idOrEmail,
          },
          {
            verificationCode: {
              code: idOrEmail,
            },
          },
        ],
      },
    });

    return user;
  },

  createUser: async (user: Pick<User, "name" | "email" | "password" | "isVerified">) => {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
        isVerified: user.isVerified,
      },
    });

    return newUser;
  },

  createVerificationCode: async (userId: string, code: string) => {
    await prisma.verificationCode.create({
      data: {
        userId,
        code,
      },
    });
  },

  findCodeUser: async (userIdorCode: string) => {
    const user = await prisma.verificationCode.findFirst({
      where: {
        OR: [
          {
            userId: userIdorCode,
          },
          {
            code: userIdorCode,
          },
        ],
      },
    });

    return user;
  },

  updateVerificationUser: async (userId: string) => {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isVerified: true,
      },
    });
  },

  updateCode: async (userId: string, code: string, now: number) => {
    await prisma.verificationCode.update({
      where: {
        userId,
      },
      data: {
        code,
        lastSentAt: new Date(now),
      },
    });
  },

  updatePassword: async (id: string, password: string) => {
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });
  },
};
