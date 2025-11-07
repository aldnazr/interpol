import { Suspense } from "react";
import NoticePage from "../ui/home/home";
import { HomeSkeleton } from "../ui/home/home-skeleton";

export default function Page() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <NoticePage noticeType="yellow" />;
    </Suspense>
  );
}
