"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { ConsultantServices } from "@/services/consultant.services";
import { S3Services } from "@/services/s3.services";

const editConsultantSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  expertise: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(1),
  image: z.instanceof(File),
});

export async function editConsultantAction(_state: unknown, formData: FormData) {
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const expertise = formData.get("expertise") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const image = formData.get("image") as File | null;

  const validation = editConsultantSchema.safeParse({
    id,
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
        id,
        name,
        expertise,
        description,
        price,
        image,
      },
    };
  }

  if (validation.data.image.name == "undefined") {
    await ConsultantServices.updateConsultant(id, name, expertise, description, price);
    redirect("/admin/consultant/");
  }

  if (validation.data.image.type !== "image/png" && validation.data.image.type !== "image/jpeg") {
    return {
      status: "error",
      message: "File harus PNG/JPG!",
    };
  }

  const find = await ConsultantServices.findConsultant(id);

  if (!find) {
    return {
      status: "error",
      message: "Konsultan tidak ditemukan!",
    };
  }

  await S3Services.deleteFile({ folder: `pp-consultant/${id}`, key: find.image });

  await ConsultantServices.updateConsultant(id, name, expertise, description, price, validation.data.image.name);

  // upload file R2
  await S3Services.uploadFile({
    key: validation.data.image.name,
    body: validation.data.image,
    folder: `pp-consultant/${id}`,
  });

  redirect("/admin/consultant/");
}
