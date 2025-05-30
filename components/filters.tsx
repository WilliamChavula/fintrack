import { Suspense } from "react";
import AccountFilter from "./account-filter";
import DateFilter from "./date-filter";

const Filters = () => {
  return (
    <div className="flex flex-col items-center gap-y-2 lg:flex-row lg:gap-x-2 lg:gap-y-0">
      <Suspense fallback={<p>Loading...</p>}>
        <AccountFilter />
        <DateFilter />
      </Suspense>
    </div>
  );
};

export default Filters;
