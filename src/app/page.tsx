import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import About from "@/components/sections/About";
import Gallery from "@/components/sections/Gallery";
import Team from "@/components/sections/Team";
import Reviews from "@/components/sections/Reviews";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import StickyBooking from "@/components/ui/StickyBooking";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Pricing />
        <About />
        <Gallery />
        <Team />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <StickyBooking />
    </div>
  );
}
