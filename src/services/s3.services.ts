import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

import { s3Client } from "@/utils/aws";

interface UploadFileArgs {
  key: string;
  folder: string;
  body?: File | Uint8Array;
}

export const S3Services = {
  uploadFile: async (args: UploadFileArgs) => {
    try {
      const buffer = args.body instanceof File ? Buffer.from(await args.body.arrayBuffer()) : args.body;
      const contentType = args.body instanceof File ? "image/png" : "application/pdf";

      const data = await s3Client.send(
        new PutObjectCommand({
          Bucket: "nukilansalaf",
          Key: `${args.folder}/${args.key}`,
          ContentType: contentType,
          Body: buffer,
        }),
      );

      return { success: true, data };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  deleteFile: async (args: UploadFileArgs | { key: string; folder: string }) => {
    try {
      const data = await s3Client.send(
        new DeleteObjectCommand({
          Bucket: "nukilansalaf",
          Key: `${args.folder}/${args.key}`,
        }),
      );

      return { success: true, data };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
