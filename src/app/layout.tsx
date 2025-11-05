// StAuth10222: I Jin Zhang, 000878821 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Drug Management System",
  description: "A Next.js application for managing drug information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <header className="bg-blue-600 text-white shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold">Drug Management System</h1>
            <p className="text-blue-100">Manage and browse pharmaceutical information</p>
          </div>
        </header>

        <nav className="bg-blue-700 text-white">
          <div className="container mx-auto px-4">
            <ul className="flex space-x-6 py-4">
              <li>
                <Link href="/" className="hover:text-blue-200 transition-colors duration-200 px-3 py-2 rounded">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/drugs" className="hover:text-blue-200 transition-colors duration-200 px-3 py-2 rounded">
                  Drugs
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-blue-200 transition-colors duration-200 px-3 py-2 rounded">
                  Admin
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <main className="flex-1 container mx-auto px-4 py-8 bg-gray-50">{children}</main>

        <footer className="bg-gray-800 text-white mt-auto">
          <div className="container mx-auto px-4 py-6">
            <div className="text-center">
              <p className="text-gray-300">
                &copy; 2024 Drug Management System. Built with Next.js and Server Components.
              </p>
              <p className="text-gray-400 text-sm mt-2">Jin Zhang - Assignment 5</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
