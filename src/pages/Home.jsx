import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import PiliersSection from "@/components/portfolio/PiliersSection";
import AboutSection from "@/components/portfolio/AboutSection";
import TestimonialsSection from "@/components/portfolio/TestimonialsSection";
import PartenairesSection from "@/components/portfolio/PartenairesSection";
import ContactSection from "@/components/portfolio/ContactSection";
import Footer from "@/components/portfolio/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PiliersSection />
      <TestimonialsSection />
      <PartenairesSection />
      <ContactSection />
      <Footer />
    </div>
  );
}