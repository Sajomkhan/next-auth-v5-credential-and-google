"use server";
import { signIn, signOut } from "@/auth";
import { db } from "@/db";
import { saltAndHashPassword } from "@/utils/helper";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

// GET USER BY EMAIL
const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

// LOGIN ACTIONS (GOOGLE, GITHUB)
export const login = async (provider: string) => {
  await signIn(provider, { redirectTo: "/" });
  revalidatePath("/");
};

// LOGOUT ACTIONS
export const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

// CREDENTIALS LOGIN ACTIONS
export const loginWithCredentials = async (email: string, password: string) => {
  const existingUser = await getUserByEmail(email);
  
  try {
    await signIn(
      "credentials",
      {
        email,
        password,
        role: "ADMIN",
        redirectTo: "/",
      },
    );
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
  revalidatePath("/");
};
