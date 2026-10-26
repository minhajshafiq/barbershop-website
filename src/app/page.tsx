import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Team from "@/components/sections/Team";
import Gallery from "@/components/sections/Gallery";
import Reviews from "@/components/sections/Reviews";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import BackToTop from "@/components/ui/BackToTop";
import StickyBooking from "@/components/ui/StickyBooking";
import { getGalleryPhotos } from "@/lib/gallery";
import { navigation } from "@/lib/site";

export default function Home() {
  const photos = getGalleryPhotos();
  // Sans photo, ni section galerie ni lien « Galerie » dans les menus
  const nav = photos.length > 0 ? navigation : navigation.filter((item) => item.href !== "#galerie");

  return (
    <div className="min-h-screen">
      <Header navigation={nav} />
      <main>
        <Hero />
        <Services />
        <About />
        <Team />
        {photos.length > 0 && <Gallery photos={photos} />}
        <Reviews />
        <Contact />
      </main>
      <Footer navigation={nav} />
      <BackToTop />
      <StickyBooking />
    </div>
  );
}
