import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: "apac",
  endpoint: process.env.R2_S3API_URL,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_ID,
    secretAccessKey: process.env.R2_SECRET_KEY,
  },
});

// export async function uploadFile(args: UploadFileArgs) {
//   try {
//     const buffer = args.body instanceof File ? Buffer.from(await args.body.arrayBuffer()) : args.body;
//     const contentType = args.body instanceof File ? "image/png" : "application/pdf";

//     const data = await s3Client.send(
//       new PutObjectCommand({
//         Bucket: "nukilansalaf",
//         Key: `${args.folder}/${args.key}`,
//         ContentType: contentType,
//         Body: buffer,
//       }),
//     );

//     return { success: true, data };
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }