"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ParticleWordmark from "@/components/ParticleWordmark";
import { BRAND, PAGES, SYSTEM_COMMANDS, resolveCommand } from "@/lib/config";

type TerminalLine = { id: number; text: string; kind: "system" | "success" | "dim" | "command" | "error" | "title" };

const BOOT_LINES: Omit<TerminalLine, "id">[] = [
  { text: "asmieeOS [Version 1.0.26]", kind: "dim" },
  { text: "© 2026 asmiee. All systems feel human.", kind: "dim" },
  { text: "", kind: "dim" },
  { text: "[ OK ] Loading creative environment", kind: "system" },
  { text: "[ OK ] Connecting humans and technology", kind: "system" },
  { text: "[ OK ] Terminal ready", kind: "system" },
  { text: "", kind: "dim" },
  { text: "WE CODE FOR PEOPLE.", kind: "title" },
  { text: 'Type /help to begin, or /exit for the regular website.', kind: "dim" },
];

export default function TerminalExperience() {
  const router = useRouter();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [command, setCommand] = useState("");
  const [deckOpen, setDeckOpen] = useState(true);
  const [booted, setBooted] = useState(false);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);
  const historyRef = useRef<string[]>([]);
  const historyIndexRef = useRef(-1);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const append = useCallback((entries: Omit<TerminalLine, "id">[]) => {
    setLines((prev) => [...prev, ...entries.map((line) => ({ ...line, id: ++idRef.current }))].slice(-52));
  }, []);

  useEffect(() => {
    const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // A small, skippable boot sequence gives the terminal a real start-up feel.
    if (noMotion) {
      append(BOOT_LINES);
      setBooted(true);
      inputRef.current?.focus();
      return;
    }
    BOOT_LINES.forEach((line, index) => {
      const timer = setTimeout(() => {
        append([line]);
        if (index === BOOT_LINES.length - 1) {
          setBooted(true);
          inputRef.current?.focus();
        }
      }, 170 + index * 145);
      timersRef.current.push(timer);
    });
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [append]);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [lines]);

  const execute = (raw: string) => {
    const text = raw.trim();
    if (!text || busy) return;
    setCommand("");
    historyRef.current = [...historyRef.current, text].slice(-40);
    historyIndexRef.current = -1;
    append([{ kind: "command", text: `C:\\asmiee> ${text}` }]);
    const normalized = resolveCommand(text);

    const page = PAGES.find((entry) => entry.command === normalized);
    if (page) {
      setBusy(true);
      append([{ kind: "success", text: `↳ opening ${page.title.toLowerCase()} environment...` }]);
      router.push(`/${page.slug}`);
      return;
    }
    if (normalized === "/exit") {
      setBusy(true);
      append([{ kind: "success", text: "↳ switching to standard website..." }]);
      router.push("/site");
      return;
    }
    if (normalized === "/back") {
      append([{ kind: "dim", text: "You're already in the terminal. Try /help." }]);
      return;
    }
    if (normalized === "/clear" || normalized === "/cls") {
      setLines([]);
      return;
    }
    if (normalized === "/help" || normalized === "/ls") {
      setDeckOpen(true);
      append([
        { kind: "title", text: "AVAILABLE COMMANDS" },
        ...PAGES.map((entry) => ({ kind: "dim" as const, text: `${entry.command.padEnd(13, " ")} ${entry.description}` })),
        ...SYSTEM_COMMANDS.map((entry) => ({ kind: "dim" as const, text: `${entry.command.padEnd(13, " ")} ${entry.description}` })),
        { kind: "dim", text: "/back         Return to the terminal from a page" },
      ]);
      return;
    }
    if (normalized === "/whoami") {
      append([
        { kind: "title", text: "asmiee // We code for people." },
        { kind: "dim", text: "We build approachable websites, apps, AI solutions and brands." },
        { kind: "dim", text: "Colombo, Sri Lanka · https://www.linkedin.com/company/asmiee/" },
      ]);
      return;
    }
    if (normalized === "/status") {
      append([
        { kind: "system", text: "[ ONLINE ] Terminal interface" },
        { kind: "system", text: "[ ONLINE ] Particle physics engine" },
        { kind: "system", text: "[ READY  ] Navigation routes" },
      ]);
      return;
    }
    append([
      { kind: "error", text: `Command not found: ${text}` },
      { kind: "dim", text: "Try /help to see the available commands." },
    ]);
  };

  const onHistoryKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (historyRef.current.length === 0) return;
      historyIndexRef.current = historyIndexRef.current < 0
        ? historyRef.current.length - 1
        : Math.max(0, historyIndexRef.current - 1);
      setCommand(historyRef.current[historyIndexRef.current] ?? "");
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyIndexRef.current < 0) return;
      historyIndexRef.current += 1;
      if (historyIndexRef.current >= historyRef.current.length) {
        historyIndexRef.current = -1;
        setCommand("");
      } else {
        setCommand(historyRef.current[historyIndexRef.current] ?? "");
      }
    }
  };

  const selectHint = (value: string) => {
    setCommand(value);
    inputRef.current?.focus();
  };

  return (
    <main className="terminal-shell">
      <div className="terminal-grid" aria-hidden="true" />
      <div className="ambient ambient-a" aria-hidden="true" />
      <div className="ambient ambient-b" aria-hidden="true" />
      <div className="terminal-layout">
        <header className="terminal-header">
          <div className="terminal-header-left">
            <span className="tiny-emblem">a<span>.</span></span>
            <span className="brand-divider" />
            <span className="header-path">/system/asmiee/terminal</span>
          </div>
          <div className="terminal-header-right">
            <span className="status-light" />
            <span>ENVIRONMENT ONLINE</span>
            <span className="header-time">v.1.0.26</span>
          </div>
        </header>

        <section className="terminal-body" aria-label="Interactive command prompt">
          <div className="console-column">
            <div className="section-index"><span>01</span><span className="section-line" /> INTERACTIVE EXPERIENCE</div>
            <div className="console-heading"><span className="square-cursor">▍</span> welcome<span className="heading-dot">.</span></div>
            <div className="console-description">A different way to meet a digital company. No menus. Just curiosity.</div>

            <div className="terminal-console" onClick={() => inputRef.current?.focus()}>
              <div className="console-topline">
                <div className="console-dots"><i /><i /><i /></div>
                <span>asmiee — command processor</span>
                <span className="console-env">bash / interactive</span>
              </div>
              <div className="console-log" ref={logRef} aria-live="polite" aria-relevant="additions text">
                {lines.map((line) => (
                  <div key={line.id} className={`log-line log-${line.kind}`}>
                    {line.text || "\u00a0"}
                  </div>
                ))}
              </div>
              <form
                className="command-form"
                onSubmit={(event) => { event.preventDefault(); execute(command); }}
                autoComplete="off"
              >
                <label htmlFor="terminal-input" className="input-prefix">C:\\asmiee<span>›</span></label>
                <input
                  id="terminal-input"
                  name="terminal-command"
                  ref={inputRef}
                  value={command}
                  onChange={(event) => setCommand(event.target.value)}
                  onKeyDown={onHistoryKey}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  placeholder={booted ? "type a command..." : "initializing..."}
                  aria-label="Type a terminal command"
                  disabled={busy}
                />
                <button className="run-command" type="submit" aria-label="Run command" disabled={busy}>
                  ↵
                </button>
              </form>
              <div className="console-bottomline">
                <span><i className="mini-pulse" /> READY FOR INPUT</span>
                <span>USE ↑ / ↓ FOR HISTORY</span>
              </div>
            </div>
            <p className="terminal-footnote"><span className="asterisk">✳</span> Not your average landing page. <button type="button" onClick={() => execute("/exit")}>Prefer the regular website? <span>↗</span></button></p>
          </div>

          <aside className={`command-deck ${deckOpen ? "deck-open" : "deck-closed"}`} aria-label="Available terminal commands">
            <div className="command-deck-header">
              <span className="deck-label">COMMAND DIRECTORY <small>⌁</small></span>
              <button
                className="deck-toggle"
                type="button"
                onClick={() => setDeckOpen((open) => !open)}
                aria-expanded={deckOpen}
                aria-label={deckOpen ? "Hide commands" : "Show commands"}
              >{deckOpen ? "−" : "+"}</button>
            </div>
            {deckOpen && (
              <div className="deck-rows">
                {PAGES.map((page, index) => (
                  <button
                    type="button"
                    className="deck-row"
                    key={page.command}
                    style={{ animationDelay: `${index * 0.095 + 0.12}s` }}
                    onClick={() => selectHint(page.command)}
                    title={`Insert ${page.command} into terminal`}
                  >
                    <span className="deck-number">{page.number}</span>
                    <span className="deck-name">{page.command}</span>
                    <span className="deck-arrow">↗</span>
                  </button>
                ))}
                <div className="deck-spacer"><span>UTILITIES</span><span>────────</span></div>
                <button type="button" className="deck-utility" onClick={() => selectHint("/help")}>/help <span>show commands</span></button>
                <button type="button" className="deck-utility deck-exit" onClick={() => selectHint("/exit")}>/exit <span>switch experience ↗</span></button>
                <p className="deck-helper">CLICK TO INSERT · PRESS ENTER TO OPEN</p>
              </div>
            )}
          </aside>
        </section>

        <div className="physics-zone" aria-label="Interactive dotted asmiee wordmark">
          <div className="physics-label"><span>02 / PARTICLE ENGINE</span><span>φ(x,y) = asmiee</span></div>
          <div className="formula formula-one" aria-hidden="true">F = −∇U(x,y)</div>
          <div className="formula formula-two" aria-hidden="true">∂x / ∂t = v</div>
          <div className="formula formula-three" aria-hidden="true">Σ particles → identity</div>
          <ParticleWordmark />
          <span className="physics-bottom-left">MOVE YOUR CURSOR TO INTERACT</span>
          <span className="physics-bottom-right">BUILT FOR CURIOUS MINDS_</span>
        </div>
        <footer className="terminal-footer">
          <span>© {new Date().getFullYear()} asmiee</span>
          <span className="footer-center">DESIGNED FOR HUMANS. POWERED BY CURIOSITY.</span>
          <a href={BRAND.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a>
        </footer>
      </div>
    </main>
  );
}
