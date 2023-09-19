"use client";

import CartProvider from "@/context/CartContext";
import { ReactNode } from "react";
export function GlobalProvider({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
