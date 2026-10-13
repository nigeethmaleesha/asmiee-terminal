"use client";

import Link from "next/link";
import { useState } from "react";
import { BRAND } from "@/lib/config";

const SERVICES = [
  { number: "01", title: "Digital products", description: "Websites and software people can actually enjoy using.", glyph: "↗" },
  { number: "02", title: "Mobile experiences", description: "Useful, friendly apps built around everyday humans.", glyph: "⌁" },
  { number: "03", title: "AI & automation", description: "Intelligent technology made simple and approachable.", glyph: "✳" },
  { number: "04", title: "Brand & creative", description: "Thoughtful identities and content people remember.", glyph: "◎" },
];

export default function StandardSite() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <main className="standard-site">
      <header className="site-header">
        <Link href="/site" className="site-logo" aria-label="asmiee home">asmiee<span>.</span></Link>
        <nav className={menuOpen ? "site-nav nav-open" : "site-nav"} aria-label="Site navigation">
          <a href="#approach" onClick={() => setMenuOpen(false)}>Our thinking</a>
          <a href="#expertise" onClick={() => setMenuOpen(false)}>What we do</a>
          <a href="#connect" onClick={() => setMenuOpen(false)}>Get in touch</a>
        </nav>
        <div className="site-header-right">
          <Link href="/terminal" className="site-terminal-link"><span className="site-prompt-icon">⌘</span> TERMINAL MODE <span>↗</span></Link>
          <button className="site-menu-toggle" type="button" aria-expanded={menuOpen} aria-label="Toggle menu" onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? "✕" : "☰"}</button>
        </div>
      </header>

      <section className="site-hero" id="approach">
        <div className="site-hero-content">
          <div className="site-eyebrow"><span className="site-eyebrow-dot" /> HUMAN-CENTERED DIGITAL STUDIO <span className="eyebrow-rule" /></div>
          <h1>We code<br />for <span>people<span className="hero-period">.</span></span></h1>
          <p>Technology should feel effortless. We create digital experiences that make complex things simple, useful, and a little more fun.</p>
          <div className="site-hero-actions">
            <a className="primary-site-button" href="#expertise">DISCOVER WHAT WE DO <span>↗</span></a>
            <Link className="secondary-site-button" href="/terminal">TRY THE TERMINAL <span>↗</span></Link>
          </div>
        </div>
        <div className="site-hero-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="orbit-core">a<span>.</span></div>
          <span className="orbit-caption orbit-caption-top">[ BUILDING FOR HUMANS ]</span>
          <span className="orbit-caption orbit-caption-bottom">ideas → impact ↗</span>
          <div className="orbit-spark orbit-spark-one" />
          <div className="orbit-spark orbit-spark-two" />
        </div>
        <div className="hero-bottom-note"><span>COLLECTIVE OF CURIOUS MINDS</span><span>BASED IN COLOMBO, SRI LANKA ↘</span></div>
      </section>

      <section className="site-statement" aria-label="Mission statement">
        <span className="statement-index">/ OUR PHILOSOPHY</span>
        <h2>Less friction.<br /><em>More feeling.</em></h2>
        <p>Smart technology only matters when it works beautifully for real people. That&apos;s where we start.</p>
      </section>

      <section className="expertise-section" id="expertise">
        <div className="expertise-heading">
          <div><span className="section-brow">/ THE THINGS WE MAKE</span><h2>Small details.<br />Big ideas.</h2></div>
          <p>From the first sketch to the final line of code, we keep the experience human.</p>
        </div>
        <div className="expertise-grid">
          {SERVICES.map((service) => (
            <article className="expertise-card" key={service.number}>
              <div className="expertise-card-head"><span>{service.number} / 04</span><span className="card-glyph">{service.glyph}</span></div>
              <div><h3>{service.title}</h3><p>{service.description}</p></div>
              <div className="card-bottom-line" />
            </article>
          ))}
        </div>
      </section>

      <section className="connect-section" id="connect">
        <div><span className="section-brow">/ YOUR NEXT IDEA STARTS HERE</span><h2>Let&apos;s make<br />something <em>matter.</em></h2></div>
        <a href={BRAND.linkedin} target="_blank" rel="noopener noreferrer" className="connect-button">CONNECT ON LINKEDIN ↗</a>
      </section>

      <footer className="site-footer">
        <span className="site-footer-logo">asmiee<span>.</span></span>
        <p>WE CODE FOR PEOPLE.</p>
        <div><Link href="/terminal">TERMINAL ↗</Link><a href={BRAND.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a><span>© {new Date().getFullYear()} ASMIEE</span></div>
      </footer>
    </main>
  );
}
