import Contact from "@/components/Contact";
import CookScene from "@/components/CookScene";
import FloatingOrder from "@/components/FloatingOrder";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import JourneyIntro from "@/components/JourneyIntro";
import MarketScene from "@/components/MarketScene";
import Marquee from "@/components/Marquee";
import MenuSection from "@/components/MenuSection";
import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import PrepScene from "@/components/PrepScene";
import ShopScene from "@/components/ShopScene";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <Preloader />
      <SmoothScroll />
      <Navbar />
      <FloatingOrder />
      <main>
        <Hero />
        <Marquee />
        <JourneyIntro />
        <MarketScene />
        <PrepScene />
        <CookScene />
        <MenuSection />
        <ShopScene />
        <Highlights />
        <Contact />
      </main>
    </>
  );
}
