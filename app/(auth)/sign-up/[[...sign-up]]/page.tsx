import Image from "next/image";
import { SignUp, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader } from "lucide-react";

export default function Page() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="hidden h-full flex-col items-center justify-center space-y-5 lg:flex">
        <Image src="/logo.svg" alt="Company Logo" width={100} height={100} />
        <div className="space-y-2 py-4 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome! Happy to meet you.
          </h1>
          <p className="text-base text-slate-700">
            Create an Account to access the Dashboard
          </p>
        </div>
      </div>
      <div className="h-full flex-col items-center justify-center px-4 lg:flex">
        <div className="mt-2 flex items-center justify-center">
          <ClerkLoaded>
            <SignUp />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader className="size-6 animate-spin" />
          </ClerkLoading>
        </div>
      </div>
    </div>
  );
}
