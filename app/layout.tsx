import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Navbar/Header";
import { GlobalProvider } from "./GlobalProvider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <GlobalProvider>
          <Header />
          {children}
          <footer
            className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
          >
            &copy; {new Date().getFullYear()} Copyright:{" "}
            <a
              className="text-dark"
              href="https://vercel.com/maryamalsadat-tabatabaei/next-js-e-commerce"
            >
              BookShop.com
            </a>
          </footer>
        </GlobalProvider>
      </body>
    </html>
  );
}
