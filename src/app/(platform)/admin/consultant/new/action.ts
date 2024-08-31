"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { ConsultantServices } from "@/services/consultant.services";
import { S3Services } from "@/services/s3.services";

const addConsultantSchema = z.object({
  name: z.string().min(1, { message: "Nama Wajib diisi" }),
  expertise: z.string().min(1, { message: "Pengalaman Wajib diisi" }),
  description: z.string().min(1, { message: "Deskripsi Wajib diisi" }),
  price: z.number({ message: "Harga Wajib diisi angka" }).min(1, { message: "Harga Wajib diisi angka" }),
  image: z.instanceof(File),
});

export async function addConsultantAction(_state: unknown, formData: FormData) {
  const name = formData.get("name") as string;
  const expertise = formData.get("expertise") as string;
  const description = formData.get("description") as string;
  const price = Number(formData.get("price"));
  const image = formData.get("image") as File | null;

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

  if (validation.data.image.type !== "image/png" && validation.data.image.type !== "image/jpeg") {
    return {
      status: "error",
      message: "File harus PNG/JPG!",
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
