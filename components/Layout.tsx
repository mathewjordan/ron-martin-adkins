import Link from "next/link";
import React, { ReactNode } from "react";
import Gallery from "./Gallery";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header>
        <Link href="/">Photography of Ron Martin-Adkins</Link>{" "}
      </header>
      <main>{children}</main>
      <Gallery />
    </>
  );
}
