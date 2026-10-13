import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p>ERROR // 404</p>
      <h1>That route doesn&apos;t exist.</h1>
      <Link href="/terminal">← Return to terminal</Link>
    </main>
  );
}
