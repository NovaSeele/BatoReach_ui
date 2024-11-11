"use client";

import { useRouter } from "next/navigation";
import { useSession, getSession } from "next-auth/react";
import { doLogout } from "actions";
import { useEffect, useState } from "react";


export default function Header() {
  const router = useRouter();
  const { data: session, status, update } = useSession();
  
  const handleAuthAction = () => {
    if (status === 'authenticated') {
      doLogout().then(() => {
        window.location.reload();
      });
      
    } else {
      router.push("/auth/login");
    }
  };

  const handleSignup = () => {
    router.push("/auth/signup");
  };

  return (
    <div className="fixed mt-[-100px] z-10 bg-white w-[100vw] shadow-md">
      <div className="py-[12px] content flex justify-between">
        <img src="/images/favicon.png" className="h-[36px]" alt="" />
        <div className="flex gap-2">
          {status !== 'authenticated' && <button
            className="text-black text-[14px] font-semibold border-[2px] border-[#F37B8F] rounded-full px-3 py-1"
            onClick={handleSignup}
          >
            Sign up
          </button>}
          <button
            className="text-black text-[14px] font-semibold border-[2px] border-[#F37B8F] rounded-full px-3 py-1"
            onClick={handleAuthAction}
          >
            {status === 'authenticated' ? "Log out" : "Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}
