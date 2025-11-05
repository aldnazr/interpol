"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Notice } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import { ServerCrash, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { fetchRedNotice } from "./lib/data";
import { HomeSkeleton } from "./ui/home/loading-skeleton";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const nameFromUrl = searchParams.get("name") ?? "";
  const forenameFromUrl = searchParams.get("forename") ?? "";
  const currentPage = Number(searchParams.get("page")) || 1;

  const [name, setName] = useState(nameFromUrl);
  const [forename, setForename] = useState(forenameFromUrl);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["notices", nameFromUrl, forenameFromUrl, currentPage],
    queryFn: () =>
      fetchRedNotice({
        name: nameFromUrl,
        forename: forenameFromUrl,
        page: currentPage,
      }),
  });

  const notices: Notice[] = data?._embedded?.notices || [];
  const totalPages = Math.ceil((data?.total || 0) / 20);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (name) {
      params.set("name", name);
    } else {
      params.delete("name");
    }
    if (forename) {
      params.set("forename", forename);
    } else {
      params.delete("forename");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getPaginationItems = () => {
    const items: (number | string)[] = [];
    const maxPagesToShow = 5;
    const siblingCount = 1;

    // Total item paginasi: 1 (halaman pertama) + 1 (halaman terakhir) + halaman saat ini + 2*siblingCount + 2 (elipsis)
    const totalSlots = 2 * siblingCount + maxPagesToShow;

    if (totalPages <= totalSlots) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
      return items;
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftEllipsis = leftSiblingIndex > 2;
    const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 1;

    items.push(1);

    if (shouldShowLeftEllipsis) {
      items.push("...");
    }

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i > 1 && i < totalPages) {
        items.push(i);
      }
    }

    if (shouldShowRightEllipsis) {
      items.push("...");
    }

    items.push(totalPages);
    return Array.from(new Set(items)); // Hapus duplikat jika ada
  };

  return (
    <div className="flex flex-col md:flex-row mt-4 gap-4">
      <Card className="w-full max-w-xs h-fit sticky top-4">
        <CardContent className="space-y-3">
          <h3 className="text-lg font-semibold">Filter</h3>
          <Input
            type="text"
            placeholder="First Name"
            value={forename}
            onChange={(e) => setForename(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Last Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSearch}>
            Search
          </Button>
        </CardFooter>
      </Card>
      <div className="flex-1">
        {isLoading && <HomeSkeleton />}
        {isError && (
          <div className="flex flex-col items-center justify-center h-full text-destructive">
            <ServerCrash className="size-8" />
            <p className="mt-2">Failed to load data from Interpol.</p>
          </div>
        )}
        {!isLoading && !isError && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {notices.map((notice) => (
                <Link
                  href={notice.entity_id.replace("/", "-")}
                  key={notice.entity_id}
                >
                  <Card className="h-full">
                    <CardHeader className="flex flex-col justify-start items-center">
                      {notice?._links?.thumbnail?.href ? (
                        <Image
                          src={notice._links.thumbnail.href}
                          alt={`Mugshot of ${notice.name}`}
                          width={150}
                          height={150}
                          loading="eager"
                          className="mx-auto rounded-md object-cover"
                        />
                      ) : (
                        <Card className="h-[150px] w-full bg-muted rounded-md flex items-center justify-center">
                          <div className="text-center w-full h-full font-semibold text-muted-foreground">
                            <User className="size-10 mx-auto mb-2" />
                            <p className="text-sm">Photo Available</p>
                            <p className="text-xs">via INTERPOL</p>
                          </div>
                        </Card>
                      )}
                      <CardTitle className="text-center pt-2 text line-clamp-2">{`${notice.forename} ${notice.name}`}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground text-center">
                      <p>Nationality: {notice.nationalities || "N/A"}</p>
                      <p>Date of Birth: {notice.date_of_birth || "N/A"}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="my-4">
              {totalPages > 1 && (
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href={createPageURL(currentPage - 1)}
                        style={{
                          pointerEvents: currentPage === 1 ? "none" : "auto",
                          opacity: currentPage === 1 ? 0.5 : 1,
                        }}
                      />
                    </PaginationItem>
                    {getPaginationItems().map((item, index) => (
                      <PaginationItem key={index}>
                        {typeof item === "number" ? (
                          <PaginationLink
                            href={createPageURL(item)}
                            isActive={currentPage === item}
                          >
                            {item}
                          </PaginationLink>
                        ) : (
                          <PaginationEllipsis />
                        )}
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href={createPageURL(currentPage + 1)}
                        style={{
                          pointerEvents:
                            currentPage === totalPages ? "none" : "auto",
                          opacity: currentPage === totalPages ? 0.5 : 1,
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
