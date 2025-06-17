// app/tours/[tourId]/page.tsx
"use client ";
import { notFound } from "next/navigation";
import { getTourById } from "@/lib/data/tours";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import ImageGallery from "@/components/ui/image-gallary";
import Link from "next/link";
interface TourPageProps {
  params: { id: string };
}

export default async function TourDetailPage({ params }: TourPageProps) {
  const tour = await getTourById(params.id);

  // Check if tour is found

  if (!tour) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="mb-4 text-sm text-gray-600">
          <div className="mb-4 text-sm text-gray-600">
            <span>
              <Link href="/">Home</Link> /{" "}
              <Link href="/things-to-do">Things to do in Japan</Link> /{" "}
              {tour.region && (
                <>
                  <Link href={`/things-to-do/${tour.region.toLowerCase()}`}>
                    Things to do in {tour.region}
                  </Link>{" "}
                  /{" "}
                </>
              )}
              <Link
                href={`/things-to-do/${tour.region.toLowerCase()}/${tour.city.toLowerCase()}`}
              >
                Things to do in {tour.city}
              </Link>{" "}
              / <span className="font-medium">{tour.title}</span>
            </span>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">{tour.title}</h1>

        <div className="flex items-center mb-6">
          <div className="flex text-yellow-400 mr-2">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(tour.rating || 0) ? "★" : "☆"}
              </span>
            ))}
          </div>
          <span>
            {tour.rating} ({tour.reviewCount} Reviews)
          </span>
          <span className="mx-2">•</span>
          <span>{tour.location}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="md:sticky md:top-4">
              <ImageGallery images={tour.images} />
            </div>

            {/* Tour images gallery would go here */}

            {/* Tour description */}
          </div>

          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-bold mb-4">
                From ${tour.price} per person
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Select Date
                  </label>
                  <select className="w-full p-2 border rounded">
                    {tour.availableDates.map((date) => (
                      <option key={date} value={date}>
                        {date}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Travelers
                  </label>
                  <select className="w-full p-2 border rounded">
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>3 Adults</option>
                    <option>4 Adults</option>
                  </select>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
                  Check Availability
                </button>

                <p className="text-sm text-green-600">
                  Free cancellation up to 24 hours before the experience starts
                  (local time)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
