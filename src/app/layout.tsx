import "@/styles/globals.css";

import type { Metadata } from "next";
import { Inter, Philosopher } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const philosopher = Philosopher({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-philosopher",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={philosopher.variable}>
      <body className={`${inter.className} font-sans`}>{children}</body>
    </html>
  );
}
