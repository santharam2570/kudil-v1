"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, LOADED_EVENT, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { PHONE, PHONE_DISPLAY } from "@/data/menu";

const links = [
  { href: "#market", label: "Our Story" },
  { href: "#kitchen", label: "Kitchen" },
  { href: "#menu", label: "Menu" },
  { href: "#visit", label: "Visit" },
  { href: "#contact", label: "Catering" },
];

export default function Navbar() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useGSAP(
    () => {
      gsap.set(root.current, { yPercent: -120 });
      const show = () => gsap.to(root.current, { yPercent: 0, duration: 0.8, ease: "expo.out", delay: 0.3 });
      window.addEventListener(LOADED_EVENT, show, { once: true });

      gsap.to(".nav-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });

      ScrollTrigger.create({
        start: 80,
        end: "max",
        onToggle: (self) => root.current?.classList.toggle("nav-solid", self.isActive),
        onUpdate: (self) => {
          if (self.progress === 0) return;
          gsap.to(root.current, {
            yPercent: self.direction === 1 && self.scroll() > 600 ? -120 : 0,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
          });
        },
      });

      return () => window.removeEventListener(LOADED_EVENT, show);
    },
    { scope: root },
  );

  return (
    <>
      <header
        ref={root}
        className="group fixed inset-x-0 top-0 z-50 transition-colors duration-500 [&.nav-solid]:bg-maroon-950/80 [&.nav-solid]:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] [&.nav-solid]:backdrop-blur-md"
      >
        <div className="nav-progress absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-gold-600 via-gold-300 to-saffron-400" />
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
          <a href="#top" className="flex items-center gap-3">
            <span className="relative block h-11 w-16 overflow-hidden rounded-lg bg-cream-100 ring-1 ring-gold-500/60">
              <Image src="/images/logo.png" alt="Kudil Biriyani logo" fill sizes="64px" className="object-cover" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-lg font-bold tracking-wider text-gold-300">KUDIL</span>
              <span className="block text-[10px] tracking-[0.35em] text-cream-200/70">BIRIYANI · TRICHY</span>
            </span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative text-sm font-medium tracking-wide text-cream-100/85 transition hover:text-gold-300 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-gold-400 after:transition-transform hover:after:origin-left hover:after:scale-x-100"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={`tel:+91${PHONE}`}
              className="hidden items-center gap-2 rounded-full bg-gradient-to-b from-gold-300 to-gold-500 px-5 py-2.5 text-sm font-semibold text-maroon-900 shadow-lg shadow-gold-700/30 transition hover:scale-105 sm:flex"
            >
              <PhoneIcon className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gold-500/50 text-gold-300 lg:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              <span className={`absolute h-0.5 w-5 bg-current transition ${open ? "rotate-45" : "-translate-y-1.5"}`} />
              <span className={`absolute h-0.5 w-5 bg-current transition ${open ? "opacity-0" : ""}`} />
              <span className={`absolute h-0.5 w-5 bg-current transition ${open ? "-rotate-45" : "translate-y-1.5"}`} />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`bg-royal fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 transition-[clip-path] duration-700 ease-[cubic-bezier(0.77,0,0.18,1)] lg:hidden ${
          open ? "[clip-path:circle(150%_at_100%_0)]" : "pointer-events-none [clip-path:circle(0%_at_100%_0)]"
        }`}
      >
        {links.map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className={`font-display text-3xl text-gold-300 transition duration-500 ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
            style={{ transitionDelay: open ? `${150 + i * 70}ms` : "0ms" }}
          >
            {l.label}
          </a>
        ))}
        <a href={`tel:+91${PHONE}`} className="mt-4 rounded-full bg-gold-400 px-6 py-3 font-semibold text-maroon-900">
          Call {PHONE_DISPLAY}
        </a>
      </div>
    </>
  );
}

export function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3 .78.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.13-.56.12-.17.25-.64.8-.79.97-.14.17-.29.19-.54.06a6.7 6.7 0 0 1-3.3-2.9c-.25-.43.25-.4.71-1.33.08-.16.04-.3-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.67.31 2.8 2.8 0 0 0-.87 2.08 4.9 4.9 0 0 0 1.02 2.58 11.1 11.1 0 0 0 4.27 3.77c1.6.69 2.22.75 3.02.63.49-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.15-1.18-.06-.1-.23-.17-.48-.29z" />
    </svg>
  );
}
