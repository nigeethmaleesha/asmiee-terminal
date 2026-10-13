/**
 * Visual palette sampled by eye from asmiee's public LinkedIn cover.
 * These are close design matches, not a published brand guideline.
 * Replace here and in app/globals.css when official HEX codes are supplied.
 */
export const BRAND = {
  name: "asmiee",
  linkedin: "https://www.linkedin.com/company/asmiee/",
  website: "https://asmiee.com/",
  tagline: "WE CODE FOR PEOPLE.",
};

export const PAGES = [
  { command: "/home", slug: "home", title: "Home", color: "#48234f", number: "01", description: "The starting point" },
  { command: "/about", slug: "about", title: "About", color: "#632c5e", number: "02", description: "The people behind the code" },
  { command: "/services", slug: "services", title: "Services", color: "#764b78", number: "03", description: "What we create" },
  { command: "/projects", slug: "projects", title: "Projects", color: "#38213f", number: "04", description: "Selected experiments" },
  { command: "/contact", slug: "contact", title: "Contact", color: "#915e81", number: "05", description: "Start a conversation" },
] as const;

export type PageSlug = (typeof PAGES)[number]["slug"];

export const SYSTEM_COMMANDS = [
  { command: "/help", description: "Show commands" },
  { command: "/whoami", description: "Meet asmiee" },
  { command: "/status", description: "Check system" },
  { command: "/clear", description: "Clear terminal" },
  { command: "/exit", description: "Standard website" },
] as const;

export function resolveCommand(value: string) {
  const normalized = value.trim().toLowerCase();
  return normalized.startsWith("/") ? normalized : `/${normalized}`;
}
