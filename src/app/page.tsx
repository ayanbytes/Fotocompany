import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import ReelsShowcase from "@/components/ReelsShowcase";
import Testimonials from "@/components/Testimonials";
import CTABand from "@/components/CTABand";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-ink">
      <ScrollProgress />
      <Navbar />
      <div id="home"><Hero /></div>
      <StatsStrip />
      <div id="services"><Services /></div>
      <div id="portfolio"><Portfolio /></div>
      <div id="reels"><ReelsShowcase /></div>
      <div id="testimonials"><Testimonials /></div>
      <div id="contact"><CTABand /></div>
      <Footer />
    </main>
  );
}
