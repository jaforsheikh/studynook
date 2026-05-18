
import Hero from "@/components/Hero";
import FeaturedRooms from "@/components/rooms/FeaturedRooms";
import HowItWorks from "@/components/HowItWorks";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-hidden">

      <Hero />
      <FeaturedRooms />
      <HowItWorks />
    </main>
  );
}