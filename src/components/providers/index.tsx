import React from "react";
import QueryProvider from "./QueryProvider";
import AppWalletProvider from "./AppWalletProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AppWalletProvider>{children}</AppWalletProvider>
    </QueryProvider>
  );
}
