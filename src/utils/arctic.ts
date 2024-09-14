import { Google } from "arctic";

const getRedirectUri = () => {
  return process.env.NODE_ENV === "production" ? process.env.GOOGLE_REDIRECT_URI_PROD : process.env.GOOGLE_REDIRECT_URI_DEV;
};

export const google = new Google(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, getRedirectUri());
