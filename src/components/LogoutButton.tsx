import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "./isomorphic/button";

// eslint-disable-next-line @typescript-eslint/require-await
async function logoutAction() {
  "use server";

  cookies().set({
    name: "token",
    value: "",
    expires: new Date(0),
    path: "/",
  });

  redirect("/login");
}

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button variant="primary" type="submit">
        Logout
      </Button>
    </form>
  );
}
