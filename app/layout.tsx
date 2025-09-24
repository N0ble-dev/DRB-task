// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
// Make sure to import SidebarTrigger
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/APPSidebar";

export const metadata: Metadata = {
  title: "DRB Task",
  description: "Dashboard for Drivers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-muted/40">
        <SidebarProvider>
          <AppSidebar />
          <div className="flex flex-1 flex-col">
            <header className=" sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:h-16 sm:px-6">
              <SidebarTrigger className="cursor-pointer w-12 h-12" />
              <h1 className="text-lg font-semibold ">Dashboard</h1>
            </header>
            <main className="flex-1 overflow-auto p-4 sm:p-6">{children}</main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
