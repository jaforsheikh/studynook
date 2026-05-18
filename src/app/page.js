import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedRooms from "@/components/rooms/FeaturedRooms";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-hidden">
      <Navbar />
      <Hero />
      <FeaturedRooms />
      <HowItWorks />
      <Footer />
    </main>
  );
}