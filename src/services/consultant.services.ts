import { Consultant } from "@prisma/client";

import prisma from "@/utils/prisma";

export const ConsultantServices = {
  createConsultant: async (consultant: Pick<Consultant, "name" | "expertise" | "description" | "price" | "image">) => {
    try {
      const newConsultant = await prisma.consultant.create({
        data: {
          name: consultant.name,
          expertise: consultant.expertise,
          description: consultant.description,
          price: consultant.price,
          image: consultant.image,
        },
      });
      return newConsultant;
    } catch (error) {
      console.log(error);
    }
  },

  updateConsultant: async (id: string, name: string, expertise: string, description: string, price: number, image?: string) => {
    await prisma.consultant.update({
      where: {
        id,
      },
      data: {
        name,
        expertise,
        description,
        price,
        image,
      },
    });
  },

  getAllConsultant: async () => {
    const data = await prisma.consultant.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return data;
  },

  findConsultant: async (id: string) => {
    const user = await prisma.consultant.findFirst({
      where: {
        id,
      },
    });

    return user;
  },
};
