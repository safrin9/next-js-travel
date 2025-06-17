import { getTour } from "@/lib/data/tours";
import PageBanner from "@/components/ui/page-banner";
import Link from "next/link";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
export default async function CityPage({
  params,
}: {
  params: { region: string; city: string };
}) {
  const tours = await getTour();

  const region = decodeURIComponent(params.region);
  const city = decodeURIComponent(params.city);
  // Filter tours for current city/region and mark top attractions
  const cityTours = tours
    .filter(
      (tour) =>
        tour.city.toLowerCase() === params.city.toLowerCase() &&
        tour.region.toLowerCase() === params.region.toLowerCase()
    )
    .map((tour) => ({
      ...tour,
      // Mark tours with high ratings as attractions
      isAttraction: (tour.rating || 0) >= 4.5,
    }));

  // Get top 15 rated activities (both tours and attractions)
  const topAttractions = [...cityTours]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 15);

  const bannerImage = cityTours[0]?.imageUrl || "/images/default-banner.jpg";

  return (
    <div>
      <Header />
      <PageBanner
        title={`Top Attractions in ${params.city}`} // Changed to match screenshot
        imageUrl={bannerImage}
        subtitle="Discover beautiful destinations and top-rated experiences"
      />
      <div className="container mx-auto px-4 py-4 text-sm text-gray-600">
        <nav className="flex items-center space-x-2">
          <Link href="/" className="hover:text-blue-600 hover:underline">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/things-to-do"
            className="hover:text-blue-600 hover:underline"
          >
            Things to do in Japan
          </Link>
          <span>/</span>
          <Link
            href={`/things-to-do/${encodeURIComponent(region.toLowerCase())}`}
            className="hover:text-blue-600 hover:underline"
          >
            Things to do in {region}
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{city}</span>
        </nav>
      </div>
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-6">Top 15 Attractions</h2>{" "}
        {/* Added heading */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topAttractions.map((activity) => (
            <div
              key={activity.id}
              className="border rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <Link href={`/attractions/${activity.id}`}>
                {" "}
                {/* Link to attraction detail page */}
                <img
                  src={activity.imageUrl}
                  alt={activity.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-1">
                    {activity.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                    {" "}
                    {/* Description with line clamp */}
                    {activity.description ||
                      `Experience ${activity.title} in ${activity.city}`}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-sm">
                        {activity.rating?.toFixed(1)}
                      </span>
                    </div>
                    <span className="text-blue-600 text-sm font-medium">
                      More
                    </span>{" "}
                    {/* "More" link */}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        {topAttractions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              No attractions found in {params.city}
            </p>
            <Link
              href={`/things-to-do/${params.region}`}
              className="text-blue-600 hover:underline"
            >
              Back to {params.region}
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
