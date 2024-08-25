"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { ConsultantServices } from "@/services/consultant.services";
import { S3Services } from "@/services/s3.services";

const addConsultantSchema = z.object({
  name: z.string(),
  expertise: z.string(),
  description: z.string().min(1),
  price: z.number(),
  image: z.instanceof(File),
});

export async function addConsultantAction(state: unknown, formData: FormData) {
  const name = formData.get("name");
  const expertise = formData.get("expertise");
  const description = formData.get("description");
  const price = Number(formData.get("price"));
  const image = formData.get("image");

  const validation = addConsultantSchema.safeParse({
    name,
    expertise,
    description,
    price,
    image,
  });

  if (!validation.success) {
    return {
      status: "error",
      errors: validation.error.flatten().fieldErrors,
      data: {
        name,
        expertise,
        description,
        price,
        image,
      },
    };
  }

  const newConsultant = await ConsultantServices.createConsultant({
    name: validation.data.name,
    expertise: validation.data.expertise,
    description: validation.data.description,
    price: validation.data.price,
    image: validation.data.image.name,
  });

  if (!newConsultant) {
    return {
      status: "error",
      message: "Gagal menambahkan konsultan!",
    };
  }

  // upload file R2
  await S3Services.uploadFile({
    key: newConsultant.image,
    body: validation.data.image,
    folder: `pp-consultant/${newConsultant.id}`,
  });

  redirect("/admin/consultant/");
}
