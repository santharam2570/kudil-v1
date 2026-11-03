"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { WHATSAPP } from "@/data/menu";
import { WhatsAppIcon } from "./Navbar";

export default function FloatingOrder() {
  const ref = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    gsap.set(ref.current, { scale: 0, autoAlpha: 0 });
    ScrollTrigger.create({
      start: () => window.innerHeight * 0.8,
      end: "max",
      onToggle: (self) =>
        gsap.to(ref.current, { scale: self.isActive ? 1 : 0, autoAlpha: self.isActive ? 1 : 0, duration: 0.5, ease: "back.out(2)" }),
    });
  });

  return (
    <a
      ref={ref}
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp"
      className="group fixed right-5 bottom-5 z-40 flex items-center gap-2 rounded-full bg-[#25d366] p-4 text-white shadow-[0_10px_30px_rgba(37,211,102,0.5)] md:right-8 md:bottom-8"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25d366] opacity-30" />
      <WhatsAppIcon className="relative h-7 w-7" />
      <span className="relative hidden max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap transition-all duration-500 group-hover:max-w-40 md:block">
        Order now
      </span>
    </a>
  );
}
