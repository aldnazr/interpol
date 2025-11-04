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
import { Skeleton } from "@/components/ui/skeleton";
import { Notice } from "@/types/api";
import { Filter, ServerCrash, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchRedNotice } from "./lib/data";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Home() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [forename, setForename] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get("page")) || 1;
  const [totalPages, setTotalPages] = useState(0);

  const loadNotices = async (
    searchParams: { name?: string; forename?: string; page?: number } = {}
  ) => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchRedNotice(searchParams);
      setNotices(data?._embedded?.notices || []);
      const itemsPerPage = 20;
      setTotalPages(Math.ceil((data?.total || 0) / itemsPerPage));
    } catch (e) {
      setError("Failed to load data from Interpol.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const name = searchParams.get("name") ?? "";
    const forename = searchParams.get("forename") ?? "";
    loadNotices({ name, forename, page: currentPage });
  }, [searchParams, currentPage]);

  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    params.set("name", name);
    params.set("forename", forename);
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
          <div className="flex flex-row items-center space-x-1">
            <Filter />
            <h3 className="text-lg">Filter</h3>
          </div>
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
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-[150px] w-full rounded-xl" />
                <div className="space-y-2 text-center flex flex-col items-center pt-2">
                  <Skeleton className="h-6 w-4/5" />
                  <Skeleton className="h-4 w-5/6 mt-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        )}
        {error && (
          <div className="flex flex-col items-center justify-center h-full text-destructive">
            <ServerCrash className="size-8" />
            <p className="mt-2">{error}</p>
          </div>
        )}
        {!isLoading && !error && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {notices.map((notice) => (
                <Link
                  href={notice.entity_id.replace("/", "-")}
                  key={notice.entity_id}
                >
                  <Card>
                    <CardHeader className="flex flex-col justify-center items-center">
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

                      <CardTitle className="text-center pt-2">{`${notice.forename} ${notice.name}`}</CardTitle>
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
