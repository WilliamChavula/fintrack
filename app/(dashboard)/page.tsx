import DataCharts from "@/components/charts/data-charts";
import DataGrid from "@/components/data-grid";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="mx-auto -mt-16 w-full max-w-screen-2xl pb-6">
      <Suspense fallback={<p>Loading...</p>}>
        <DataGrid />
        <DataCharts />
      </Suspense>
    </main>
  );
}
