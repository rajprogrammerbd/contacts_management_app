import type { Metadata } from "next";
import localFont from "next/font/local";
import NavigationBar from "./Components/Navigation";
import { ToastContainer } from 'react-toastify';
import ReactQueryProvider from "./Components/ReactQueryProvider";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Contacts Management Application",
  description: "Application for managing contacts list",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <NavigationBar>
            {children}
            <ToastContainer />
          </NavigationBar>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
