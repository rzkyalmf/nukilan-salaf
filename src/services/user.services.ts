import { User } from "@prisma/client";

import prisma from "@/utils/prisma";

export const UserServices = {
  findUserByEmail: async (email: string) => {
    const user = await prisma.user.findFirst({
      where: {
        AND: [
          {
            email,
          },
          {
            isVerified: true,
          },
        ],
      },
    });

    return user;
  },

  createUser: async (user: Pick<User, "name" | "email" | "password">) => {
    const newUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
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
        ],
      },
    });

    return user;
  },

  findCodeUser: async (userId: string, code: string) => {
    const user = await prisma.verificationCode.findFirst({
      where: {
        AND: [
          {
            userId,
          },
          {
            code,
          },
        ],
      },
    });

    return user;
  },

  verificationUser: async (id: string) => {
    const user = await prisma.user.findFirst({
      where: {
        AND: [
          {
            id,
          },
          {
            isVerified: true,
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

  updateCode: async (userId: string, code: string) => {
    await prisma.verificationCode.update({
      where: {
        userId,
      },
      data: {
        code,
      },
    });
  },
};