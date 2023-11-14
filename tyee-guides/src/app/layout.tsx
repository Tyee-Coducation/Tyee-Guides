import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "@components/SessionProvider";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tyee Guides",
  description: "Students helping students around Tyee Middle School",
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Navbar />
          {children} <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
