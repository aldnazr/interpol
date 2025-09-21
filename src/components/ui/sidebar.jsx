"use client";

import React from "react";
import { useSidebar } from "./sidebar-provider";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export function Sidebar() {
  const { open } = useSidebar();
  const pathName = usePathname();

  const linkClass = (path) =>
    `block rounded p-2 hover:bg-gray-700 ${
      pathName === path ? "bg-gray-900 text-white" : "text-gray-300"
    }`;

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-center p-4">
        <Image
          src={"https://www.interpol.int/build/images/logo.e44aaf3c.webp"}
          width={110}
          height={50}
          alt="Interpol Logo"
        />
      </div>
      <nav className="space-y-2 p-4">
        <Link href="/red" className={linkClass("/red")}>
          Red Notice
        </Link>
        <Link href="/yellow" className={linkClass("/yellow")}>
          Yellow Notice
        </Link>
        <Link href="/un" className={linkClass("/un")}>
          Un Notice
        </Link>
      </nav>
    </aside>
  );
}
