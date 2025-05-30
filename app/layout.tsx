import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import TanStackProviders from "@/providers/tanstack-provider";

import type { Metadata } from "next";
import type { ReactNode } from "react";

import { AccountSheetProvider } from "@/components/sheet-provider";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinTrack App",
  description:
    "Personal Finance Tracker! Manage your finances with an intuitive user interface",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <TanStackProviders>
            <AccountSheetProvider />
            <Toaster />
            {children}
          </TanStackProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
