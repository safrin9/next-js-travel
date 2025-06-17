import TourCard from "@/components/ui/tour-card";

import { searchTours } from "@/lib/data/tours";
import FilterToggle from "@/components/ui/filter-toggle";
import { FilterCarousel } from "@/components/ui/filter-carousel";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import Link from "next/link";
interface TourListingPageProps {
  params: {
    searchTerm: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function TourListingPage({
  params,
  searchParams,
}: TourListingPageProps) {
  const { searchTerm } = params;
  const decodedSearchTerm = decodeURIComponent(searchTerm);
  const tours = await searchTours(decodedSearchTerm, searchParams);

  const sampleTour = tours.length > 0 ? tours[0] : null;

  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto py-4 px-4">
        <div className="mb-4 text-sm text-gray-600">
          <span>
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>{" "}
            /{" "}
            <Link href="/things-to-do" className="hover:text-blue-600">
              Things to do in Japan
            </Link>{" "}
            {sampleTour?.region && (
              <>
                /{" "}
                <Link
                  href={`/things-to-do/${sampleTour.region.toLowerCase()}`}
                  className="hover:text-blue-600"
                >
                  Things to do in {sampleTour.region}
                </Link>{" "}
              </>
            )}
            {sampleTour?.city && (
              <>
                /{" "}
                <Link
                  href={`/things-to-do/${sampleTour.region.toLowerCase()}/${sampleTour.city.toLowerCase()}`}
                  className="hover:text-blue-600"
                >
                  Things to do in {sampleTour.city}
                </Link>{" "}
              </>
            )}
            / <span className="font-medium">{decodedSearchTerm} Tours</span>
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          All {decodedSearchTerm} Tours & Excursions in 2025
        </h1>

        <div className="flex items-center mb-6 space-x-2">
          <div className="shrink-0">
            <FilterToggle />
          </div>

          <div className="w-px h-10 mb-3 bg-gray-600" />

          <div className="flex-1 min-w-0 -mt-3">
            <FilterCarousel />
          </div>
        </div>

        {/* Tours listing */}
        <div className="md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{tours.length}+ results</p>
            {/* Sort dropdown would go here */}
          </div>
          {tours.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No tours found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
