"use client";
import { SessionProvider } from "next-auth/react";
import CartProvider from "@/context/CartContext";
import AuthProvider from "@/context/AuthContext";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ReactNode } from "react";
export function GlobalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <ToastContainer position="bottom-right" />
      <AuthProvider>
        <CartProvider>
          <SessionProvider>{children}</SessionProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}
