"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ModeToggle } from "./mode-toggle";
import { CircleAlert, ShieldAlert, Siren, TriangleAlert } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const items = [
  { title: "Red Notice", url: "/", icon: ShieldAlert },
  { title: "Yellow Notice", url: "/yellow", icon: TriangleAlert },
  { title: "UN Notice", url: "/un", icon: CircleAlert },
];

const colors = {
  "/": "text-red-500",
  "/yellow": "text-yellow-500",
  "/un": "text-blue-500",
} as const;

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <SidebarMenuButton variant={"disabled"} asChild>
          <div className="text-white hover:text-white active:text-white my-2 md:my-1 bg-linear-to-r from-blue-600 from-20% to-red-500 to-80%">
            <Siren />
            <span className="text-nowrap font-semibold">Interpol</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={clsx(
                        "text-nowrap flex h-10 grow items-center justify-start gap-2 rounded-md p-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        {
                          "bg-accent text-accent-foreground":
                            pathname === item.url,
                        }
                      )}
                    >
                      <item.icon
                        className={colors[item.url as keyof typeof colors]}
                      />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle size={open ? "icon" : "icon-sm"} />
      </SidebarFooter>
    </Sidebar>
  );
}
