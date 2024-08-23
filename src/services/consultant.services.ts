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
};
