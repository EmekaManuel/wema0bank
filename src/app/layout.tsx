import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import { AuthProvider } from "@/providers/auth-provider";
export const metadata: Metadata = {
  title: "Xpress",
  description: "A test application for frontend developer role at Wema.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    url: "/",
    title: "Xpress",
    description: "A test application for frontend developer role at Wema.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xpress",
    description: "A test application for frontend developer role at Wema.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <QueryProvider>
          {/* removed enableSystem */}
          <ThemeProvider attribute="class" defaultTheme="light">
            <AuthProvider>{children}</AuthProvider>
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
