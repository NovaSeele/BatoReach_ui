'use server'

import { signIn, signOut } from "../../auth";

export async function doLogout() {
  await signOut({ redirectTo: "/" });
}

export async function doCredentialLogin(credentials) {
  try {
    const response = await signIn("credentials", {
      email: credentials.email,
      password: credentials.password,
      redirect: false,
    });
    
    return response;
  } catch (err) {
    throw err;
  } finally {
    console.log("Login completed.");
  }
}