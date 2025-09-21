"use client";

import React from "react";
import { useSidebar } from "./sidebar-provider";
// bebas pakai ikon apa saja
import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button"; // kalau pakai shadcn/ui button

export function SidebarTrigger() {
  const { open, setOpen } = useSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setOpen(!open)}
      className="z-50 bg-gray-700 cursor-pointer"
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
}
