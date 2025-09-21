"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import RedNoticesList from "@/components/ui/red-notice-list";
import { Sidebar } from "@/components/ui/sidebar";
import { useSidebar } from "@/components/ui/sidebar-provider";
import { SidebarTrigger } from "@/components/ui/sidebar-trigger";
import { cn } from "@/lib/utils";
import { Filter, TextCursorInput } from "lucide-react";

export default function RedPage() {
  const { open } = useSidebar();

  return (
    <>
      <Sidebar />
      <main
        className={cn(open ? "ml-64" : "ml-0", "transition-all duration-300")}
      >
        <div className="p-4 flex items-center gap-2.5">
          <SidebarTrigger />
          <h1 className="text-2xl font-bold">Red Notice List</h1>
        </div>
        <div className="flex space-x-4 mx-4">
          <Card className="w-72 h-min sticky top-4">
            <CardContent>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter
              </CardTitle>
              <form className="flex flex-col my-4 space-y-3">
                <input
                  type="text"
                  placeholder="Name"
                  className="py-2 px-3 border rounded-sm"
                ></input>
                <input
                  type="text"
                  placeholder="Forename"
                  className="py-2 px-3 border rounded-sm "
                ></input>
                <select type="text" className=" py-2 px-3 border rounded-sm">
                  <option>Select country</option>
                </select>
                <Button type="submit">Apply</Button>
              </form>
            </CardContent>
          </Card>
          <div className="flex flex-col flex-1">
            <RedNoticesList />
          </div>
        </div>
      </main>
    </>
  );
}
