import { Skeleton } from "@/components/ui/skeleton";

export const HomeSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col bg-blue-950/10 rounded-2xl justify-center"
        >
          <Skeleton className="h-[150px] w-[150px] self-center rounded-xl mt-6 mb-5" />
          <Skeleton className="h-6 w-4/5 self-center mb-5" />
          <div className="space-y-2 text-center flex flex-col items-center mb-6">
            <Skeleton className="h-3 w-5/6" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
};
