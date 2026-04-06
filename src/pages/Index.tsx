import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import NewsAndFaqSection from "@/components/home/NewsAndFaqSection";

export default function Index() {
  return (
    <>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <NewsAndFaqSection />
      <Footer />
    </>
  );
}
