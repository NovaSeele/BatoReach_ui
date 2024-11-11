import { Nunito } from "next/font/google";
import './globals.css';
import Header from "@/components/common/header";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "../auth";

const inter = Nunito({ subsets: ["latin"] });

export default async function RootLayout({ children }) {
  const session = await auth();
  console.log("Layout:", session);
  
  return (
    <SessionProvider session={session}>
    <html lang="en">
      <body className={inter.className + ""}>
        <Header/>
        <div className="w-full mt-[100px]">{children}</div>
      </body>
    </html>
    </SessionProvider>
  );
}
