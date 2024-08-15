import { resend } from "@/utils/resend";

import { UserServices } from "./user.services";

export const EmailServices = {
  sendVerificationCode: async (userId: string, code: string) => {
    const user = await UserServices.findUser(userId);

    if (user) {
      const { data, error } = await resend.emails.send({
        from: "Nukilan Salaf <nukilansalaf@gmail.com>",
        to: [user.email],
        subject: "Verifikasi Akun Nukilan Salaf!",
        html: `<p>Kode OTP ${code}</p>`,
      });

      console.log({ data, error });
    }
  },
};
