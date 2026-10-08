"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import {
  ACCOMPANIMENTS,
  additionalItems,
  categories,
  desserts,
  formatINR,
  PHONE,
  QUANTITY,
  type Category,
  type Pack,
} from "@/data/menu";

const tierStyle: Record<Pack["tier"], { head: string; ring: string; btn: string }> = {
  Budget: { head: "from-leaf-500 to-leaf-700", ring: "ring-leaf-600/30", btn: "bg-leaf-600 hover:bg-leaf-700" },
  Premium: { head: "from-maroon-600 to-maroon-800", ring: "ring-maroon-700/30", btn: "bg-maroon-700 hover:bg-maroon-800" },
  Luxury: { head: "from-navy-600 to-navy-700", ring: "ring-navy-600/30", btn: "bg-navy-600 hover:bg-navy-700" },
};

const orderLink = (cat: Category, p: Pack) =>
  `https://wa.me/91${PHONE}?text=${encodeURIComponent(
    `Hi Kudil Biriyani! I'd like to order the ${p.tier} Pack ${cat.label} (${p.rice}) — ${formatINR(p.price)} per padi.`,
  )}`;

function PackCard({ cat, pack }: { cat: Category; pack: Pack }) {
  const ref = useRef<HTMLDivElement>(null);
  const s = tierStyle[pack.tier];

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el, { rotateY: x * 14, rotateX: -y * 14, duration: 0.5, ease: "power2.out", transformPerspective: 900 });
    el.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  };
  const onLeave = () => gsap.to(ref.current, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" });

  return (
    <div className="mn-card [perspective:900px]">
      <div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={`group relative h-full overflow-hidden rounded-3xl bg-cream-50 shadow-xl ring-1 ${s.ring} [transform-style:preserve-3d]`}
      >
        <div className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(circle_at_var(--gx,50%)_var(--gy,50%),rgba(255,255,255,0.45),transparent_45%)]" />
        <div className={`bg-gradient-to-br ${s.head} px-6 pt-6 pb-8 text-center`}>
          <p className="font-display text-2xl font-black text-gold-300">{pack.tier} Pack</p>
          <p className="mt-1 text-sm text-cream-100/85">{cat.label}</p>
          <p className="mt-1 font-serif text-sm italic text-gold-200">({pack.rice})</p>
        </div>
        <div className="relative -mt-5 px-6 pb-6">
          <div className="mx-auto w-fit rounded-2xl border border-gold-500/50 bg-white px-6 py-3 text-center shadow-lg">
            <p className="text-[10px] tracking-[0.3em] text-maroon-600/70">PRICE PER PADI</p>
            <p className="mn-price font-display text-4xl font-black text-maroon-800" data-price={pack.price}>
              {formatINR(pack.price)}
            </p>
          </div>
          <dl className="mt-6 space-y-3 text-sm">
            {[
              ["Quantity", QUANTITY],
              [cat.id === "chicken" ? "Chicken" : "Mutton", pack.pieces],
              ["With", ACCOMPANIMENTS],
            ].map(([k, v]) => (
              <div key={k} className="flex items-start justify-between gap-4 border-b border-dashed border-gold-500/40 pb-2">
                <dt className="font-semibold text-maroon-700">{k}</dt>
                <dd className="text-right text-maroon-950/75">{v}</dd>
              </div>
            ))}
          </dl>
          <a
            href={orderLink(cat, pack)}
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-6 flex items-center justify-center gap-2 rounded-full ${s.btn} px-5 py-3 text-sm font-semibold text-cream-50 transition`}
          >
            Order this pack →
          </a>
        </div>
      </div>
    </div>
  );
}

function PriceList({ title, items, tone }: { title: string; items: typeof additionalItems; tone: "maroon" | "leaf" }) {
  return (
    <div className="mn-list overflow-hidden rounded-3xl bg-cream-50 shadow-xl ring-1 ring-gold-500/30">
      <div className={`${tone === "maroon" ? "bg-maroon-700" : "bg-leaf-600"} px-6 py-4 text-center`}>
        <h3 className="font-display text-xl font-bold tracking-widest text-gold-200">{title}</h3>
      </div>
      <ul className="divide-y divide-dashed divide-gold-500/40 px-6 py-2">
        {items.map((it) => (
          <li key={it.name} className="mn-row flex items-center justify-between gap-4 py-4">
            <div>
              <p className="font-semibold text-maroon-900">{it.name}</p>
              <p className="text-xs text-maroon-900/60">{it.qty}</p>
            </div>
            <p className="font-display text-xl font-bold text-maroon-700">{formatINR(it.price)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function MenuSection() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const cat = categories[active];

  useGSAP(
    () => {
      gsap.from(".mn-head > *", {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".mn-head", start: "top 80%" },
      });
      gsap.from(".mn-visual", {
        scale: 0.5,
        rotate: -90,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: ".mn-visual", start: "top 85%" },
      });
      gsap.to(".mn-visual-inner", {
        rotate: 40,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.from(".mn-card", {
        y: 120,
        rotateX: -35,
        opacity: 0,
        stagger: 0.15,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".mn-cards", start: "top 85%" },
      });
      gsap.utils.toArray<HTMLElement>(".mn-list").forEach((el, i) => {
        gsap.from(el, {
          x: i ? 120 : -120,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
        gsap.from(el.querySelectorAll(".mn-row"), {
          x: i ? 40 : -40,
          opacity: 0,
          stagger: 0.1,
          duration: 0.6,
          delay: 0.3,
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    },
    { scope: root },
  );

  const switchTo = (i: number) => {
    if (i === active || !root.current) return;
    const q = gsap.utils.selector(root.current);
    const photo = q(".mn-photo");
    const cards = q(".mn-card");
    const tl = gsap.timeline();
    tl.to(photo, { scale: 0.6, rotate: 180, opacity: 0, duration: 0.35, ease: "power2.in" })
      .to(cards, { rotateY: 90, opacity: 0, stagger: 0.06, duration: 0.3, ease: "power2.in" }, 0)
      .add(() => setActive(i))
      .to(photo, { scale: 1, rotate: 360, opacity: 1, duration: 0.7, ease: "back.out(1.6)" }, "+=0.05")
      .fromTo(cards, { rotateY: -90 }, { rotateY: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: "back.out(1.4)" }, "<")
      .set(photo, { rotate: 0 });
    tl.add(() => {
      q(".mn-price").forEach((el: HTMLElement) => {
        const target = Number(el.dataset.price);
        const o = { v: target * 0.6 };
        gsap.to(o, {
          v: target,
          duration: 0.8,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = formatINR(Math.round(o.v / 10) * 10);
          },
        });
      });
    }, 0.4);
  };

  return (
    <section id="menu" ref={root} className="bg-paper relative overflow-hidden py-24 md:py-36">
      <div className="pointer-events-none absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gold-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-maroon-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mn-head text-center">
          <p className="font-display text-sm tracking-[0.4em] text-maroon-600">OUR MENU</p>
          <h2 className="mt-3 font-display text-4xl font-black text-maroon-800 md:text-6xl">Biriyani Packages</h2>
          <p className="mt-3 font-tamil text-xl text-saffron-500">சுவை மாறாத பாரம்பரியம்</p>
          <div className="ornament-divider mx-auto mt-6 h-4 max-w-sm" />
          <p className="mx-auto mt-4 max-w-xl text-maroon-950/70">
            Priced per padi — each padi serves about 9 people. Perfect for family get-togethers, functions and mini hall
            catering.
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="relative flex rounded-full bg-maroon-900 p-1.5 shadow-xl">
            <span
              className="absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] rounded-full bg-gradient-to-b from-gold-300 to-gold-500 transition-transform duration-500 ease-[cubic-bezier(0.68,-0.4,0.27,1.4)]"
              style={{ transform: `translateX(${active * 100}%)` }}
            />
            {categories.map((c, i) => (
              <button
                key={c.id}
                type="button"
                onClick={() => switchTo(i)}
                className={`relative z-10 w-40 rounded-full px-4 py-3 text-sm font-semibold transition-colors sm:w-48 ${
                  active === i ? "text-maroon-900" : "text-cream-100/80 hover:text-cream-50"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[0.8fr_2fr]">
          <div className="mn-visual relative mx-auto aspect-square w-full max-w-xs lg:max-w-none">
            <div className="mn-visual-inner absolute inset-0 rounded-full border-2 border-dashed border-gold-500/60" />
            <div className="mn-photo absolute inset-[7%] overflow-hidden rounded-full shadow-2xl ring-4 ring-gold-400">
              <Image src={cat.image} alt={cat.caption} fill sizes="(max-width: 1024px) 320px, 360px" className="scale-125 object-cover" />
            </div>
            <div className="absolute -bottom-4 left-1/2 w-max -translate-x-1/2 rounded-full border border-gold-400 bg-maroon-700 px-5 py-2 text-center shadow-lg">
              <p className="font-tamil text-sm text-gold-200">{cat.tamil}</p>
            </div>
          </div>

          <div className="mn-cards grid gap-6 md:grid-cols-3">
            {cat.packs.map((p) => (
              <PackCard key={p.tier} cat={cat} pack={p} />
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2">
          <PriceList title="ADDITIONAL ITEMS" items={additionalItems} tone="maroon" />
          <PriceList title="DESSERTS" items={desserts} tone="leaf" />
        </div>
      </div>
    </section>
  );
}
