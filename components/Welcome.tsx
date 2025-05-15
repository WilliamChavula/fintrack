"use client";

import { useUser } from "@clerk/nextjs";

const Welcome = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="mb-4 space-y-3 text-center">
      <h2 className="text-2xl font-medium text-white lg:text-4xl">
        Welcome back, {isLoaded && user?.firstName}!
      </h2>
      <p className="text-xs text-blue-300 lg:text-sm">
        Here&apos;s your financial overview snapshot
      </p>
    </div>
  );
};

export default Welcome;
