"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { EMAIL, PHONE, PHONE_DISPLAY, WHATSAPP } from "@/data/menu";
import { PhoneIcon, WhatsAppIcon } from "./Navbar";
import { Bell, Rockfort } from "./svg/Scenery";

const channels = [
  { label: "Call us", value: PHONE_DISPLAY, href: `tel:+91${PHONE}`, icon: <PhoneIcon className="h-7 w-7" />, ring: true },
  { label: "WhatsApp", value: "Chat & order", href: WHATSAPP, icon: <WhatsAppIcon className="h-7 w-7" /> },
  {
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7" aria-hidden>
        <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 7.2L20 6H4l8 5.2zM4 8v10h16V8l-8 5.2L4 8z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".ct-line", {
        yPercent: 110,
        stagger: 0.12,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".ct-head", start: "top 80%" },
      });
      gsap.from(".ct-card", {
        y: 80,
        opacity: 0,
        rotateX: -40,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".ct-cards", start: "top 85%" },
      });
      gsap.fromTo(".ct-rock", { yPercent: 40 }, {
        yPercent: 0,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true },
      });
      gsap.from(".ct-bell", {
        y: -200,
        stagger: 0.15,
        duration: 1.4,
        ease: "elastic.out(1, 0.4)",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.to(".ct-bell", { rotate: 8, transformOrigin: "50% 0%", duration: 1.6, ease: "sine.inOut", repeat: -1, yoyo: true, stagger: 0.3 });
    },
    { scope: root },
  );

  return (
    <section id="contact" ref={root} className="bg-royal relative overflow-hidden pt-28 pb-0 md:pt-36">
      {[8, 22, 78, 92].map((l, i) => (
        <svg key={l} viewBox="-30 -60 60 90" className="ct-bell pointer-events-none absolute top-0 hidden w-10 md:block" style={{ left: `${l}%`, height: 120 + (i % 2) * 60 }} aria-hidden>
          <path d="M0 -60 V -40" stroke="#8a5f1c" strokeWidth="2" />
          <Bell />
        </svg>
      ))}

      <div className="relative mx-auto max-w-6xl px-5 text-center md:px-8">
        <div className="ct-head">
          <p className="overflow-hidden font-display text-sm tracking-[0.4em] text-gold-400">
            <span className="ct-line inline-block">TRADITIONAL FLAVORS · MEMORABLE OCCASIONS</span>
          </p>
          <h2 className="mt-4 font-display text-4xl leading-tight font-black text-cream-50 md:text-7xl">
            <span className="block overflow-hidden"><span className="ct-line inline-block">Planning a function?</span></span>
            <span className="block overflow-hidden"><span className="ct-line text-gold-gradient inline-block">Let Kudil cater it.</span></span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-cream-200/75 md:text-lg">
            Weddings, birthdays, house-warmings or mini hall get-togethers — we bring the handi, the flavour and the
            smiles. Call us to plan your menu.
          </p>
        </div>

        <div className="ct-cards mt-14 grid gap-5 [perspective:1000px] md:grid-cols-3">
          {channels.map((c) => (
            <div key={c.label} className="ct-card">
            <a
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group relative block h-full overflow-hidden rounded-3xl border border-gold-500/30 bg-white/5 p-7 text-left backdrop-blur transition hover:-translate-y-2 hover:border-gold-400 hover:bg-white/10"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-gold-300/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              <span className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-b from-gold-300 to-gold-500 text-maroon-900 ${c.ring ? "[&>svg]:animate-ring" : ""}`}>
                {c.icon}
              </span>
              <p className="mt-5 text-xs tracking-[0.3em] text-gold-400 uppercase">{c.label}</p>
              <p className={`mt-1 font-bold break-all text-cream-50 ${c.label === "Email" ? "text-base md:text-lg" : "font-display text-xl md:text-2xl"}`}>{c.value}</p>
            </a>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center gap-2">
          <p className="font-serif text-2xl text-gold-200 italic md:text-3xl">Trichy — Our Heritage, Our Pride</p>
          <p className="font-tamil text-lg text-saffron-400">திருச்சி · எங்கள் பாரம்பரியம், எங்கள் பெருமை</p>
        </div>
      </div>

      <svg viewBox="-600 -360 1200 380" className="ct-rock relative mx-auto mt-10 block h-[clamp(160px,28vw,340px)] w-full" preserveAspectRatio="xMidYMax meet" aria-hidden>
        <Rockfort fill="#22050a" transform="scale(1.15)" />
        <Rockfort fill="#22050a" opacity="0.6" transform="translate(-460 0) scale(0.45)" />
        <Rockfort fill="#22050a" opacity="0.6" transform="translate(470 0) scale(0.5)" />
        <rect x="-700" y="-2" width="1400" height="30" fill="#22050a" />
      </svg>

      <footer className="relative bg-maroon-950 px-5 pt-4 pb-10 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
            <span className="relative block h-12 w-[72px] overflow-hidden rounded-lg bg-cream-100 ring-1 ring-gold-500/60">
              <Image src="/images/logo.png" alt="Kudil Biriyani" fill sizes="72px" className="object-cover" />
            </span>
            <div>
              <p className="font-display text-lg font-bold tracking-wider text-gold-300">KUDIL CATERING</p>
              <p className="font-serif text-sm text-cream-200/60 italic">Taste that stays with you…</p>
            </div>
          </div>
          <p className="text-center text-xs text-cream-200/50">
            © Kudil Biriyani, Trichy · Made with ❤️ & lots of ghee
          </p>
        </div>
      </footer>
    </section>
  );
}
