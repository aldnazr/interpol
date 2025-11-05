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
  { title: "Un Notice", url: "/un", icon: CircleAlert },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <SidebarMenuButton variant={"disabled"} asChild>
          <div className="">
            <Siren />
            <span className="text-base font-semibold">Interpol</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={clsx(
                        "flex h-10 grow items-center justify-start gap-2 rounded-md p-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        {
                          "bg-accent text-accent-foreground":
                            pathname === item.url,
                        }
                      )}
                    >
                      <item.icon />
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
