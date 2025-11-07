import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function NoticeDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-5 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-destructive/10 rounded-lg">
            <Skeleton className="h-6 w-6 text-destructive" />
          </div>
          <div className="flex-1">
            <Skeleton className="h-9 w-64 mb-2" />
            <Skeleton className="h-5 w-40" />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information Card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <div>
                  <Skeleton className="h-4 w-28 mb-2" />
                  <Skeleton className="h-6 w-32" />
                </div>
                <div>
                  <Skeleton className="h-4 w-28 mb-2" />
                  <Skeleton className="h-6 w-40" />
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <div className="flex items-center gap-2 mt-1">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-20" />
                  </div>
                </div>
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <div className="flex items-center gap-2 mt-1">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Physical Characteristics Card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-52" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <div>
                  <Skeleton className="h-4 w-16 mb-2" />
                  <Skeleton className="h-6 w-20" />
                </div>
                <div>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-24" />
                </div>
                <div>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-24" />
                </div>
              </div>

              <Separator className="my-4" />
              <div>
                <Skeleton className="h-4 w-40 mb-2" />
                <Skeleton className="h-16 w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Criminal Charges Card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="space-y-3">
              <Skeleton className="h-6 w-48" />
              <div>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          {/* Photo Card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-16" />
            </CardHeader>
            <CardContent>
              <Skeleton className="aspect-3/4 w-full rounded-lg" />
            </CardContent>
          </Card>

          {/* Quick Facts Card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-28" />
            </CardHeader>
            <CardContent className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* External Resources Card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent className="flex flex-col items-start space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>

          {/* Warning Notice Card */}
          <Card className="border-warning bg-red-700">
            <CardContent>
              <div className="flex items-start gap-3 py-6">
                <Skeleton className="h-4 w-4 bg-red-500" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-32 bg-red-500" />
                  <Skeleton className="h-12 w-full bg-red-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
