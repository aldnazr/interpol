import { Skeleton } from "@/components/ui/skeleton";

export const HomeSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
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
  );
};
