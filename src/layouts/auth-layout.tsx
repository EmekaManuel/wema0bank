"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-blue-500 font-bold text-3xl">
              XPRESS
            </Link>
          </div>
          <div>
            {pathname === "/signin" ? (
              <>
                <span className="text-gray-600 mr-2">
                  Don&#39;t have an account?
                </span>
                <Link
                  href="/"
                  className="inline-block px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <span className="text-gray-600 mr-2">
                  Already have an account?
                </span>
                <Link
                  href="/signin"
                  className="inline-block px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[552px] w-full bg-white rounded-lg shadow-md p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
