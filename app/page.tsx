// app/(home)/page.tsx
import Header from "@/components/ui/header";
import TourCard from "@/components/ui/tour-card";
import { featuredTours } from "@/lib/data/tours";
import TourCarousel from "@/components/ui/tour-carousel";
import { popularDestinations } from "@/lib/data/destinations";
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto py-8 px-4">
        <section className="container mx-auto py-12">
          <h2 className="text-3xl font-bold mb-8 px-4">Featured Tours</h2>
          <TourCarousel />
        </section>
      </main>
      <Footer />
    </div>
  );
}
