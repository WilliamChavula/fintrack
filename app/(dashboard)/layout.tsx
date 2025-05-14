import { ReactNode } from "react";
import Header from "@/components/Header";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-6"> {children}</main>
    </>
  );
};

export default Layout;
