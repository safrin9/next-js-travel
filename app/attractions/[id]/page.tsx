// app/attractions/[id]/page.tsx
import { getTour } from "@/lib/data/tours";

export default async function AttractionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const tours = await getTour();
  const attraction = tours.find((tour) => tour.id === params.id);

  if (!attraction) {
    return <div>Attraction not found</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{attraction.title}</h1>
        <img
          src={attraction.imageUrl}
          alt={attraction.title}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />
        <div className="flex items-center mb-6">
          <span className="text-yellow-500 text-xl">★</span>
          <span className="ml-2 text-lg">{attraction.rating?.toFixed(1)}</span>
          {attraction.duration && (
            <span className="ml-4 text-gray-500">{attraction.duration}</span>
          )}
        </div>
        <div className="prose max-w-none">
          <p className="text-lg mb-4">
            {attraction.description ||
              `Explore ${attraction.title} in ${attraction.city}`}
          </p>
          {/* Add more detailed content here */}
        </div>
      </div>
    </div>
  );
}
