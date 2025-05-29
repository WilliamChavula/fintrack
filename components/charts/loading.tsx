import { Loader } from "lucide-react";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export const ChartSkeleton = () => {
  return (
    <Card className="border-none drop-shadow-xs">
      <CardHeader className="flex justify-between space-y-2 lg:flex-row lg:items-center lg:space-y-0">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-full lg:w-[120px]" />
      </CardHeader>
      <CardContent>
        <div className="flex h-[350px] w-full flex-col items-center justify-center gap-y-4">
          <Loader className="text-muted-foreground size-5 animate-spin" />
        </div>
      </CardContent>
    </Card>
  );
};
