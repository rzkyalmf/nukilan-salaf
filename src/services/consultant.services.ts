import { Consultant } from "@prisma/client";

import prisma from "@/utils/prisma";

export const ConsultantServices = {
  createConsultant: async (consultant: Pick<Consultant, "name" | "expertise" | "description" | "image">) => {
    try {
      const newConsultant = await prisma.consultant.create({
        data: {
          name: consultant.name,
          expertise: consultant.expertise,
          description: consultant.description,
          image: consultant.image,
        },
      });
      return newConsultant;
    } catch (error) {
      console.log(error);
    }
  },

  updateConsultant: async (id: string, name: string, expertise: string, description: string, image?: string) => {
    await prisma.consultant.update({
      where: {
        id,
      },
      data: {
        name,
        expertise,
        description,
        image,
      },
    });
  },

  getAllConsultantWithAvailableScheduleCount: async () => {
    return await prisma.consultant.findMany({
      include: {
        _count: {
          select: {
            schedules: {
              where: {
                isAvailable: true,
              },
            },
          },
        },
      },
    });
  },

  findConsultant: async (id: string) => {
    const user = await prisma.consultant.findFirst({
      where: {
        id,
      },
    });

    return user;
  },

  createSchedule: async (consultantId: string, dateTime: string, expiryDateTime: string, price: number, timeZone: string) => {
    return await prisma.schedule.create({
      data: {
        consultantId,
        dateTime,
        expiryDateTime,
        timeZone,
        price,
      },
    });
  },

  getAllSchedule: async (consultantId: string) => {
    const schedules = await prisma.schedule.findMany({
      where: {
        consultantId,
        isAvailable: true,
      },
    });

    return schedules;
  },

  findSchedule: async (id: string) => {
    const schedule = await prisma.schedule.findFirst({
      where: {
        id,
      },
    });

    return schedule;
  },

  updateSchedule: async (id: string, userId: string) => {
    await prisma.schedule.update({
      where: {
        id,
      },
      data: {
        userId,
      },
    });
  },
};
