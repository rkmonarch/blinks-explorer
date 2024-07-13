import React from "react";
import AppWalletProvider from "./AppWalletProvider";
import QueryProvider from "./QueryProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AppWalletProvider>{children}</AppWalletProvider>
    </QueryProvider>
  );
}
