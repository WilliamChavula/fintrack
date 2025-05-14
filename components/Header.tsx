import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";

const Header = () => {
  return (
    <header className="bg-gradient-to-b from-slate-900 to-slate-950 px-4 py-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="flex w-full items-center justify-between">
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
            <Navigation />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
