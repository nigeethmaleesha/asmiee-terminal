"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { PAGES } from "@/lib/config";

type Page = (typeof PAGES)[number];

export default function PlaceholderPage({ page }: { page: Page }) {
  const router = useRouter();

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") router.push("/terminal");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [router]);

  return (
    <main className="placeholder-screen" style={{ backgroundColor: page.color }}>
      <header className="placeholder-top">
        <Link href="/terminal" className="placeholder-brand" aria-label="Return to asmiee terminal">asmiee<span>.</span></Link>
        <span>ROUTE <strong>{page.number} / 05</strong></span>
      </header>
      <div className="placeholder-center">
        <div className="placeholder-kicker"><span className="placeholder-dash" /> {page.command.toUpperCase()} <span className="placeholder-dash" /></div>
        <h1>{page.title}<span>.</span></h1>
        <p>{page.description}</p>
        <span className="coming-soon">FULL EXPERIENCE COMING SOON</span>
        <Link className="placeholder-back" href="/terminal"><span>←</span> BACK TO TERMINAL</Link>
      </div>
      <footer className="placeholder-bottom">
        <span>ASMIEE / INTERACTIVE PREVIEW</span>
        <span>PRESS ESC TO RETURN</span>
      </footer>
    </main>
  );
}
