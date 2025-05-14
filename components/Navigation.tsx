"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useMedia } from "react-use";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { MenuIcon } from "lucide-react";

const routes: { name: string; path: string }[] = [
  {
    name: "Dashboard",
    path: "/",
  },
  {
    name: "Transactions",
    path: "/transactions",
  },
  {
    name: "Accounts",
    path: "/accounts",
  },
  {
    name: "Categories",
    path: "/categories",
  },
  {
    name: "Settings",
    path: "/settings",
  },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isMobile = useMedia("(max-width: 1024px)", false);

  const handleClose = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="border-none bg-white/10 font-normal text-white transition outline-none hover:bg-white/20 hover:text-white focus:bg-white/30 focus-visible:ring-transparent focus-visible:ring-offset-0"
          >
            <MenuIcon className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-4">
          <SheetHeader>
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col space-y-3 pt-6">
            {routes.map((route) => (
              <Button
                key={route.path}
                onClick={() => handleClose(route.path)}
                variant={pathname === route.path ? "secondary" : "ghost"}
              >
                {route.name}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="hidden items-center gap-x-3 overflow-x-auto lg:flex">
      {routes.map((route) => (
        <NavigationItem
          key={route.path}
          name={route.name}
          path={route.path}
          isActive={pathname === route.path}
        />
      ))}
    </nav>
  );
};

export default Navigation;

type NavigationItemProps = {
  name: string;
  path: string;
  isActive?: boolean;
};

const NavigationItem = ({ name, path, isActive }: NavigationItemProps) => {
  return (
    <Button
      asChild
      size="sm"
      variant="outline"
      className={cn(
        "w-full justify-between border-none font-normal text-white transition hover:bg-white/20 hover:text-white focus:bg-white/30 focus-visible:ring-transparent focus-visible:ring-offset-0 lg:w-auto",
        isActive ? "bg-white/10" : "bg-transparent",
      )}
    >
      <Link href={path}>{name}</Link>
    </Button>
  );
};
