import Link from "next/link";
import React, { ReactNode } from "react";
import Gallery from "./Gallery";
import Header from "./Header";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Gallery isHome={children?.props?.isHome} />
    </>
  );
}
