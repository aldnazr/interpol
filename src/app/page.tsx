"use client";

import { Suspense } from "react";
import NoticePage from "./ui/home/home";
import { HomeSkeleton } from "./ui/home/home-skeleton";

export default function Home() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <NoticePage noticeType="red" />
    </Suspense>
  );
}
