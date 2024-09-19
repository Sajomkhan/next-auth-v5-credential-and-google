import { auth } from "@/auth";
import type { Metadata } from "next";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Home Page",
  description: "Generated by create next app",
};

export default async function AuthinticateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <div className="mx-auto max-w-screen-xl h-screen flex flex-col px-4 sm:px-6 md:px-8">
    <Navbar />
    <div className="flex-grow">{children}</div>
  </div>
  );
}
