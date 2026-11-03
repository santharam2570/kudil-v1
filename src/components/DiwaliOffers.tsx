"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import {
  DIWALI_PHONE,
  DIWALI_PHONE_DISPLAY,
  diwaliCampaign,
  diwaliOffers,
  diwaliWhatsApp,
  formatINR,
  type DiwaliOffer,
} from "@/data/menu";
import { PhoneIcon, WhatsAppIcon } from "./Navbar";

const combos = diwaliOffers.filter((o) => o.kind === "combo");
const buckets = diwaliOffers.filter((o) => o.kind === "bucket");
const chickenCombo = combos[0];
const muttonCombo = combos[1];

function OfferCard({ offer, featured }: { offer: DiwaliOffer; featured?: boolean }) {
  return (
    <article
      className={`dw-card group relative flex h-full flex-col overflow-hidden rounded-3xl bg-cream-50 shadow-xl ring-1 ring-gold-500/40 ${
        featured ? "md:min-h-[420px]" : ""
      }`}
    >
      <div className="bg-gradient-to-br from-maroon-700 via-maroon-800 to-maroon-950 px-6 pt-6 pb-8 text-center">
        <p className="font-display text-lg font-black text-gold-200 sm:text-xl">{offer.title}</p>
        <p className="mt-3 font-display text-4xl font-black text-gold-300 sm:text-5xl">{formatINR(offer.price)}</p>
        <p className="mt-2 text-xs tracking-[0.2em] text-cream-100/75 uppercase">{offer.kind === "bucket" ? "Bucket" : "Combo"}</p>
      </div>
      <div className="relative -mt-4 flex flex-1 flex-col px-5 pb-6">
        <p className="mx-auto w-fit rounded-full border border-gold-500/50 bg-white px-4 py-1.5 text-sm font-semibold text-maroon-800 shadow-md">
          {offer.serves}
        </p>
        <ul className="mt-5 flex-1 space-y-2.5 text-sm">
          {offer.items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 border-b border-dashed border-gold-500/35 pb-2 text-maroon-950/80">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-6 grid grid-cols-2 gap-2">
          <a
            href={diwaliWhatsApp(offer)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-full bg-[#25d366] px-3 py-2.5 text-xs font-semibold text-white transition hover:brightness-110 sm:text-sm"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Pre-order
          </a>
          <a
            href={`tel:+91${DIWALI_PHONE}`}
            className="flex items-center justify-center gap-1.5 rounded-full bg-maroon-800 px-3 py-2.5 text-xs font-semibold text-gold-200 transition hover:bg-maroon-700 sm:text-sm"
          >
            <PhoneIcon className="h-4 w-4" />
            Call
          </a>
        </div>
      </div>
    </article>
  );
}

export default function DiwaliOffers() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".dw-head > *", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".dw-head", start: "top 80%" },
      });
      gsap.from(".dw-card", {
        y: 90,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".dw-combos", start: "top 85%" },
      });
      gsap.from(".dw-banner", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".dw-banner", start: "top 90%" },
      });
    },
    { scope: root },
  );

  return (
    <section id="diwali" ref={root} className="bg-royal relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,196,106,0.2),transparent_55%)]" />
      <div className="pointer-events-none absolute -top-24 left-[-10%] h-64 w-64 rounded-full bg-saffron-500/20 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10%] bottom-0 h-64 w-64 rounded-full bg-gold-400/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="dw-head text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-white/5 px-4 py-1.5 text-xs tracking-[0.3em] text-gold-300 uppercase">
            <span aria-hidden>🪔</span> Pre-orders only
          </p>
          <p className="mt-5 font-tamil text-2xl text-saffron-400 md:text-3xl">{diwaliCampaign.tamil}</p>
          <h2 className="mt-2 font-display text-4xl font-black text-cream-50 md:text-6xl">
            {diwaliCampaign.title}
          </h2>
          <div className="ornament-divider mx-auto mt-6 h-4 max-w-sm" />
          <p className="mx-auto mt-4 max-w-2xl text-cream-200/75">
            Festive combos and buckets for family gatherings. Pre-order now — served on Diwali weekend.
          </p>
        </div>

        <div className="dw-combos mt-12 grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
          {chickenCombo ? <OfferCard offer={chickenCombo} featured /> : null}
          <div className="relative mx-auto hidden w-56 lg:block xl:w-72">
            <div className="absolute inset-[-12%] rounded-full border border-dashed border-gold-500/40" />
            <div className="relative aspect-square overflow-hidden rounded-full shadow-2xl ring-4 ring-gold-400">
              <Image
                src="/images/chicken.png"
                alt="Kudil Diwali biriyani"
                fill
                sizes="288px"
                className="scale-125 object-cover"
              />
            </div>
          </div>
          {muttonCombo ? <OfferCard offer={muttonCombo} featured /> : null}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {buckets.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>

        <div className="dw-banner mt-12 overflow-hidden rounded-3xl border border-gold-500/40 bg-gradient-to-r from-maroon-800 via-maroon-700 to-maroon-900 p-6 text-center shadow-2xl md:p-8">
          <p className="text-xs tracking-[0.35em] text-gold-400 uppercase">Limited festive bonus</p>
          <p className="mt-3 font-display text-xl font-bold text-cream-50 md:text-3xl">
            Book before {diwaliCampaign.doubleHalwaUntilLabel} &amp; pay in full
          </p>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-gold-200 md:text-base">
            Get <span className="font-black text-gold-300">DOUBLE</span> the Bread Halwa listed on the menu.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {diwaliCampaign.serveDates.map((d) => (
              <span
                key={d.date}
                className="rounded-full border border-gold-400/50 bg-maroon-950/50 px-4 py-2 text-sm text-cream-50"
              >
                <span className="font-display font-bold text-gold-300">{d.date}</span>
                <span className="ml-2 text-cream-200/70">({d.day})</span>
              </span>
            ))}
          </div>
          <p className="mt-4 text-xs tracking-[0.2em] text-cream-200/60 uppercase">Offer dates · delivery / pickup</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={diwaliWhatsApp()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-gold-300 to-gold-500 px-6 py-3 font-semibold text-maroon-900 shadow-lg shadow-gold-700/30 transition hover:scale-105"
            >
              <WhatsAppIcon className="h-5 w-5" />
              Pre-order on WhatsApp
            </a>
            <a
              href={`tel:+91${DIWALI_PHONE}`}
              className="inline-flex items-center gap-2 rounded-full border border-gold-400/70 px-6 py-3 font-semibold text-gold-200 transition hover:bg-gold-400/10"
            >
              <PhoneIcon className="h-4 w-4" />
              Call {DIWALI_PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
