"use client";

import { Button } from "@/components/ui/button";
import RedNoticesList from "@/components/ui/red-notice-list";
import { Sidebar } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar-provider";
import { SidebarTrigger } from "@/components/ui/sidebar-trigger";
import { cn } from "@/lib/utils";

export default function UnPage() {
  const { open } = useSidebar();

  return (
    <>
      <Sidebar />
      <main
        className={cn(open ? "ml-64" : "ml-0", "transition-all duration-300")}
      >
        <div className="p-4 flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="text-xl font-bold">Halaman Utama</h1>
        </div>
        <div className="flex space-x-4 mx-4">
          <div className="w-72 p-4 h-80 bg-gray-100 rounded-lg shadow-md sticky top-4">
            <h1 className="text-xl font-medium">Filter</h1>
            <form className="flex flex-col mt-4 space-y-3">
              <input
                type="text"
                placeholder="Nama"
                className="bg-white py-2 px-3 border rounded-sm focus:border-blue-600"
              ></input>
              <input
                type="text"
                placeholder="Nama"
                className="bg-white py-2 px-3 border rounded-sm focus:border-blue-600"
              ></input>
              <input
                type="text"
                placeholder="Nama"
                className=" bg-white py-2 px-3 border rounded-sm focus:border-blue-600"
              ></input>
              <Button type="submit">Apply</Button>
            </form>
          </div>
          <div className="flex flex-col flex-1 border-2 shadow-lg rounded-lg">
            <RedNoticesList />
          </div>
        </div>
      </main>
    </>
  );
}
