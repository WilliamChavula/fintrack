import Image from "next/image";
import Link from "next/link";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";

import { Loader } from "lucide-react";
import Navigation from "@/components/Navigation";
import Welcome from "@/components/Welcome";

const Header = () => {
  return (
    <header className="bg-gradient-to-b from-slate-900 to-slate-950 px-4 py-6 lg:px-8">
      <section className="mx-auto max-w-2xl">
        <div className="mb-12 flex w-full items-center justify-between">
          <div className="flex items-center gap-5">
            <Link href="/">
              <div className="hidden items-center gap-2 lg:flex">
                <Image
                  src="/logo.svg"
                  alt="Company Logo"
                  width={32}
                  height={32}
                />
                <p className="font-semibold text-white">FinTrack</p>
              </div>
            </Link>
            {/* Navigation Menu */}
            <Navigation />
          </div>
          {/* User Profile Button */}
          <ClerkLoaded>
            <UserButton />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader className="size-4 animate-spin text-slate-400" />
          </ClerkLoading>
        </div>
        {/* Welcome Message */}
        <Welcome />
      </section>
    </header>
  );
};

export default Header;
