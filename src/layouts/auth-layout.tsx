"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Fixed Responsive Navbar */}
      <header className="fixed top-0 left-0 w-full bg-white shadow-sm py-3 sm:py-4 px-4 sm:px-6 z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="text-[#039BF0] font-bold text-2xl sm:text-3xl"
            >
              XPRESS
            </Link>
          </div>

          {/* Auth Links */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            {pathname === "/signin" ? (
              <>
                <span className="text-gray-600 text-sm md:text-base">
                  Don&#39;t have an account?
                </span>
                <Link
                  href="/"
                  className="inline-block px-3 sm:px-4 py-2 border border-blue-500 text-[#039BF0] rounded text-sm md:text-base hover:bg-blue-50"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <span className="text-gray-600 text-sm md:text-base">
                  Already have an account?
                </span>
                <Link
                  href="/signin"
                  className="inline-block px-3 sm:px-4 py-2 border border-blue-500 text-[#039BF0] rounded text-sm md:text-base hover:bg-blue-50"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Padding to prevent overlap with the fixed navbar */}
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-[552px] w-full bg-white rounded-lg shadow-md p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
