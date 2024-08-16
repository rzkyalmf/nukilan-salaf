import { resend } from "@/utils/resend";

import { UserServices } from "./user.services";

export const EmailServices = {
  sendVerificationCode: async (userId: string, code: string) => {
    const user = await UserServices.findUser(userId);

    if (user) {
      const { data, error } = await resend.emails.send({
        from: "Nukilan Salaf <admission@nukilansalaf.com>",
        to: [user.email],
        subject: "Verifikasi Akun Nukilan Salaf!",
        html: `
          <p>Kode OTP : <b>${code}</b></p>
          <p>Link Verifikasi Akun : <a href="http://localhost:3000/verify/${userId}">Klik Disini!</a></p>
          `,
      });

      console.log({ data, error });
    }
  },
};
